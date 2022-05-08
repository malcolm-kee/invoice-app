export type { Address, InvoiceItem, InvoiceStatus } from '@prisma/client';
export {
  CreateInvoiceBody,
  GetInvoicesQueryParams,
  invoiceController,
  UpdateInvoiceBody,
} from './invoice.controller';
import type { ArrayMember, DataToJson } from '../../lib/type-helper';
import type { getInvoices } from './invoice.service';

export type Invoice = DataToJson<
  ArrayMember<Awaited<ReturnType<typeof getInvoices>>>
>;
