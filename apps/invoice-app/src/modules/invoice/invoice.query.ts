import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  GetInvoicesQueryParams,
  Invoice,
  updateInvoice,
  UpdateInvoiceBody,
} from './invoice.api';

const QUERY_KEYS = {
  invoices: 'invoices',
  invoiceDetails: 'invoiceDetails',
};

export const useInvoices = (params?: GetInvoicesQueryParams) => {
  return useQuery({
    queryFn: () => getInvoices(params),
    queryKey: [QUERY_KEYS.invoices, params],
    keepPreviousData: true,
  });
};

export const useInvoice = (invoiceId: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryFn: () => getInvoice(invoiceId),
    queryKey: [QUERY_KEYS.invoiceDetails, invoiceId],
    placeholderData: () =>
      (
        queryClient.getQueryData([QUERY_KEYS.invoices], {
          exact: false,
        }) as Invoice[]
      )?.find((inv) => inv.id === invoiceId),
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.invoices),
  });
};

export const useUpdateInvoice = (invoiceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateInvoiceBody) =>
      updateInvoice({
        invoiceId,
        body,
      }),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries(QUERY_KEYS.invoices),
        queryClient.invalidateQueries([QUERY_KEYS.invoiceDetails, invoiceId]),
      ]),
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.invoices),
  });
};
