import { InvoiceStatus } from '@prisma/client';
import { z } from 'zod';

const stringRequired = z.string().min(1, 'Required');
const dateRequired = z.string().min(1, 'Required');

const decimal = z.string().or(stringRequired);

export const addressSchema = z.object({
  street: stringRequired,
  city: stringRequired,
  postCode: stringRequired,
  country: stringRequired,
});

export const invoiceItemSchema = z.object({
  name: stringRequired,
  quantity: z.number(),
  price: decimal,
});

export const invoiceSchema = z.object({
  description: stringRequired,
  issueDate: dateRequired,
  paymentDue: dateRequired,
  paymentTerms: z.number(),
  clientName: stringRequired,
  clientEmail: stringRequired,
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(invoiceItemSchema).min(1),
  status: z.union([
    z.literal(InvoiceStatus.DRAFT),
    z.literal(InvoiceStatus.PENDING),
    z.literal(InvoiceStatus.PAID),
  ]),
});
