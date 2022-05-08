import { decodeId, prettifyId } from '../../lib/id';
import { DataToJson } from '../../lib/type-helper';
import { Address, InvoiceItem, prisma, Prisma } from '../../prisma';

export const getInvoices = (where?: Prisma.InvoiceWhereInput) =>
  prisma.invoice
    .findMany({
      include: {
        invoiceItems: true,
        clientAddress: true,
        senderAddress: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where,
    })
    .then((invoices) => invoices.map(prettifyId));

export const getOneInvoice = (invoiceId: string) => {
  const id = decodeId(invoiceId);

  return prisma.invoice
    .findUnique({
      include: {
        invoiceItems: true,
        clientAddress: true,
        senderAddress: true,
      },
      where: {
        id,
      },
    })
    .then((result) => result && prettifyId(result));
};

type AddressData = Omit<Address, 'id'>;

type InvoiceItemData = DataToJson<
  Omit<InvoiceItem, 'id' | 'total' | 'invoiceId'>
>;

export interface CreateInvoiceInput
  extends Omit<
    Prisma.InvoiceCreateInput,
    'senderAddress' | 'clientAddress' | 'invoiceItems' | 'total'
  > {
  senderAddress: AddressData;
  clientAddress: AddressData;
  items: Array<InvoiceItemData>;
}

export const createInvoice = ({
  senderAddress,
  clientAddress,
  items,
  ...input
}: CreateInvoiceInput) => {
  const itemsWithTotal = items.map(mapInvoiceItem);

  return prisma.invoice.create({
    data: {
      ...input,
      total: itemsWithTotal.reduce((total, item) => total + item.total, 0),
      senderAddress: {
        create: senderAddress,
      },
      clientAddress: {
        create: clientAddress,
      },
      invoiceItems: {
        createMany: {
          data: itemsWithTotal,
        },
      },
    },
  });
};

export interface UpdateInvoiceInput
  extends Omit<
    Prisma.InvoiceUpdateInput,
    'senderAddress' | 'clientAddress' | 'invoiceItems' | 'total'
  > {
  senderAddress?: AddressData;
  clientAddress?: AddressData;
  items?: Array<InvoiceItemData & { id?: number }>;
}

export const updateInvoice = (
  invoiceId: string,
  { senderAddress, clientAddress, items = [], ...data }: UpdateInvoiceInput
) => {
  const decodedInvoiceId = decodeId(invoiceId);

  const itemsWithTotal = items.map(mapInvoiceItem);

  const itemsToUpdates = itemsWithTotal.filter(
    (item) => typeof item.id === 'number'
  );
  const itemsToCreate = itemsWithTotal.filter(
    (item) => typeof item.id !== 'number'
  );

  return prisma.invoice.update({
    data: {
      ...data,
      total: itemsWithTotal.reduce((total, item) => total + item.total, 0),
      clientAddress: clientAddress && {
        update: clientAddress,
      },
      senderAddress: senderAddress && {
        update: senderAddress,
      },
      invoiceItems: {
        createMany: {
          data: itemsToCreate,
        },
        updateMany: itemsToUpdates.map(
          ({ name, quantity, price, total, id }) => {
            return {
              data: {
                name,
                quantity,
                price,
                total,
              },
              where: {
                id,
              },
            };
          }
        ),
      },
    },
    where: {
      id: decodedInvoiceId,
    },
  });
};

export const deleteInvoice = (invoiceId: string) => {
  const id = decodeId(invoiceId);

  return prisma.invoice.delete({
    where: {
      id,
    },
  });
};

const mapInvoiceItem = <Data extends InvoiceItemData>(data: Data) => ({
  ...data,
  total: data.price && data.quantity ? Number(data.price) * data.quantity : 0,
});
