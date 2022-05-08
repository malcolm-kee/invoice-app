import type {
  CreateInvoiceBody,
  GetInvoicesQueryParams,
  Invoice,
  UpdateInvoiceBody,
} from 'invoice-api';
import { fetchJson } from 'ui';

export type {
  CreateInvoiceBody,
  GetInvoicesQueryParams,
  Invoice,
  UpdateInvoiceBody,
} from 'invoice-api';

const baseUrl = import.meta.env.VITE_INVOICE_API_BASE_URL;

export const getInvoices = ({ status }: GetInvoicesQueryParams = {}) =>
  fetchJson(
    `${baseUrl}/invoice` + (status ? `?status=${status}` : '')
  ) as Promise<Invoice[]>;

export const getInvoice = (invoiceId: string) =>
  fetchJson(`${baseUrl}/invoice/${invoiceId}`) as Promise<Invoice>;

export const createInvoice = (body: CreateInvoiceBody) =>
  fetchJson(`${baseUrl}/invoice`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const updateInvoice = (data: {
  invoiceId: string;
  body: UpdateInvoiceBody;
}) =>
  fetchJson(`${baseUrl}/invoice/${data.invoiceId}`, {
    method: 'PUT',
    body: JSON.stringify(data.body),
  });

export const deleteInvoice = (invoiceId: string) =>
  fetchJson(`${baseUrl}/invoice/${invoiceId}`, {
    method: 'DELETE',
  });
