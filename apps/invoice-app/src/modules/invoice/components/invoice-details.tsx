import { ChevronLeftIcon } from '@heroicons/react/solid';
import { Invoice } from 'invoice-api';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Dialog, formatDate, SlideOver, Table } from 'ui';
import { LeftSlideOver } from '~/components/left-slide-over';
import { usePersist } from '~/lib/use-persist';
import { useQueryParams } from '~/lib/use-query-params';
import {
  useDeleteInvoice,
  useInvoice,
  useUpdateInvoice,
} from '../invoice.query';
import { InvoiceAddress } from './invoice-address';
import {
  InitialInvoiceData,
  InvoiceForm,
  useInvoiceFormState,
} from './invoice-form';
import { InvoiceStatusBadge } from './invoice-status-badge';

export const InvoiceDetails = () => {
  const params = useParams();

  const { data, isLoading } = useInvoice(params.invoiceId!);
  const navigate = useNavigate();

  const [queryParams, setQueryParams] = useQueryParams();

  const showEditForm = queryParams.get('edit') === 'true';
  const dismissEditForm = () => setQueryParams({});

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);
  const { mutate: deleteInvoice, isLoading: isDeleting } = useDeleteInvoice();

  return (
    <div className="grid gap-5">
      <div>
        <Link to="/" className="inline-flex items-center gap-3">
          <ChevronLeftIcon
            className="text-primary-500"
            width={20}
            height={20}
            aria-hidden
          />
          Go back
        </Link>
      </div>
      <Card>
        <div className="flex flex-row justify-between md:items-center gap-5 flex-wrap">
          <div className="flex items-center gap-3">
            Status {data && <InvoiceStatusBadge status={data.status} />}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() =>
                setQueryParams({
                  edit: 'true',
                })
              }
              disabled={isLoading}
              variant="light"
            >
              Edit
            </Button>
            {data && (
              <LeftSlideOver open={showEditForm} onDismiss={dismissEditForm}>
                <SlideOver.Header
                  title={`Edit #${data.id}`}
                  showDismissBtn={false}
                />
                <EditInvoiceForm
                  currentData={data}
                  onDismiss={dismissEditForm}
                />
              </LeftSlideOver>
            )}
            <Button
              onClick={() => setShowDeleteConfirmation(true)}
              disabled={isLoading}
              variant="red"
            >
              Delete
            </Button>
            {data && (
              <Dialog
                open={showDeleteConfirmation}
                onDismiss={() => setShowDeleteConfirmation(false)}
              >
                <Dialog.Title>Confirm Deletion</Dialog.Title>
                <p className="text-sm text-gray-600 my-4">
                  Are you sure you want to delete invoice #{data.id}? This
                  action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setShowDeleteConfirmation(false)}
                    variant="light"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      deleteInvoice(data.id, {
                        onSuccess: () => navigate('/'),
                      })
                    }
                    variant="red"
                    disabled={isDeleting}
                  >
                    Delete
                  </Button>
                </div>
              </Dialog>
            )}
            {data && data.status === 'PENDING' && (
              <MarkAsPaidButton invoiceId={data.id} />
            )}
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-gray-600">#</span>
                {data && data.id}
              </h1>
              <p>{data && data.description}</p>
            </div>
            <div>
              {data && data.senderAddress && (
                <InvoiceAddress
                  address={data.senderAddress}
                  className="text-right"
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div className="col-span-2 md:col-span-1 flex md:flex-col justify-between gap-5">
              <div className="flex-1">
                <div className="text-gray-600">Invoice Date</div>
                <div className="text-lg md:text-2xl font-bold">
                  {(data && data.issueDate && formatDate(data.issueDate)) ||
                    '-'}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-gray-600">Payment Due</div>
                <div className="text-lg md:text-2xl font-bold">
                  {(data && data.paymentDue && formatDate(data.paymentDue)) ||
                    '-'}
                </div>
              </div>
            </div>
            <div>
              <div className="text-gray-600">Bill to</div>
              <div className="text-lg md:text-2xl font-bold">
                {(data && data.clientName) || '-'}
              </div>
              {data && data.clientAddress && (
                <InvoiceAddress address={data.clientAddress} className="mt-3" />
              )}
            </div>
            <div>
              <div className="text-gray-600">Sent to</div>
              <div className="text-lg md:text-2xl font-bold">
                {(data && data.clientEmail) || '-'}
              </div>
            </div>
          </div>
          {data && data.invoiceItems.length > 0 && (
            <Table className="mt-5">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="text-left">Item Name</Table.Th>
                  <Table.Th className="text-right">Qty</Table.Th>
                  <Table.Th className="text-right">Price</Table.Th>
                  <Table.Th className="text-right">Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.invoiceItems.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>{item.name}</Table.Td>
                    <Table.Td className="text-right">{item.quantity}</Table.Td>
                    <Table.Td className="text-right">{item.price}</Table.Td>
                    <Table.Td className="text-right">{item.total}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
              <Table.Tfoot>
                <Table.Tr>
                  <Table.Td colSpan={3} className="px-3 py-2">
                    Amount Due
                  </Table.Td>
                  <Table.Td className="px-3 py-2 text-xl text-right">
                    {data.total}
                  </Table.Td>
                </Table.Tr>
              </Table.Tfoot>
            </Table>
          )}
        </div>
      </Card>
    </div>
  );
};

const MarkAsPaidButton = (props: { invoiceId: string }) => {
  const { mutate: updateInvoice, isLoading } = useUpdateInvoice(
    props.invoiceId
  );

  return (
    <Button
      onClick={() =>
        updateInvoice({
          status: 'PAID',
        })
      }
      disabled={isLoading}
      variant="primary"
    >
      Mark as Paid
    </Button>
  );
};

const EditInvoiceForm = (props: {
  currentData: Invoice;
  onDismiss: () => void;
}) => {
  const { cleanup, initialValue } = usePersist({
    storageKey: 'editInvoice',
    getValue: () => form.getValues(),
  });
  const form = useInvoiceFormState(
    (initialValue as unknown as InitialInvoiceData) || props.currentData
  );

  const dismiss = () => {
    cleanup();
    props.onDismiss();
  };

  const {
    mutate: update,
    isLoading,
    error,
  } = useUpdateInvoice(props.currentData.id);

  const submit = () =>
    form.handleSubmit((values) => {
      update(
        {
          ...values,
          status: 'PENDING',
        },
        {
          onSuccess: dismiss,
        }
      );
    })();

  return (
    <>
      <SlideOver.Content>
        <InvoiceForm form={form} error={error} />
      </SlideOver.Content>
      <SlideOver.Footer className="flex justify-end items-center">
        <div className="flex gap-2">
          <Button onClick={dismiss} variant="light">
            Cancel
          </Button>
          <Button onClick={submit} variant="primary" disabled={isLoading}>
            Save Changes
          </Button>
        </div>
      </SlideOver.Footer>
    </>
  );
};
