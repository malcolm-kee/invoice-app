import { ChevronRightIcon, PlusIcon } from '@heroicons/react/solid';
import { InvoiceStatus } from 'invoice-api';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, formatDate, SlideOver } from 'ui';
import { LeftSlideOver } from '~/components/left-slide-over';
import { useCreateInvoice, useInvoices } from '../invoice.query';
import {
  InitialInvoiceData,
  InvoiceForm,
  useInvoiceFormState,
} from './invoice-form';
import { InvoiceStatusBadge } from './invoice-status-badge';
import { useQueryParams } from '~/lib/use-query-params';
import { usePersist } from '~/lib/use-persist';

export const InvoiceList = () => {
  const [status, setStatus] = React.useState<undefined | InvoiceStatus>(
    undefined
  );

  const { data } = useInvoices({ status });

  const [queryParams, setQueryParams] = useQueryParams();

  const isCreateFormShown = queryParams.get('create') === 'true';

  const dismissCreateForm = () => setQueryParams({});

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl sm:text-5xl font-bold">Invoices</h1>
          {data &&
            (data.length === 0 ? (
              <p className="text-sm text-gray-600">No invoices</p>
            ) : (
              <p className="text-sm text-gray-600">
                There are {data.length} invoices.
              </p>
            ))}
        </div>
        <div className="flex gap-2">
          <Dropdown
            value={status}
            onChangeValue={setStatus}
            options={[
              {
                label: 'All',
                value: undefined,
                selectedLabel: 'Filter by status',
              },
              {
                label: 'Draft',
                value: 'DRAFT',
                selectedLabel: 'Status: Draft',
              },
              {
                label: 'Pending',
                value: 'PENDING',
                selectedLabel: 'Status: Pending',
              },
              {
                label: 'Paid',
                value: 'PAID',
                selectedLabel: 'Status: Paid',
              },
            ]}
            variant="minimal"
          />
          <Button
            onClick={() => setQueryParams({ create: 'true' })}
            LeftIcon={PlusIcon}
          >
            New Invoice
          </Button>
          <LeftSlideOver open={isCreateFormShown} onDismiss={dismissCreateForm}>
            <SlideOver.Header title="New Invoice" showDismissBtn={false} />
            <CreateInvoiceForm onDismiss={dismissCreateForm} />
          </LeftSlideOver>
        </div>
      </div>
      {data ? (
        data.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-5 py-12 max-w-xs mx-auto">
            <img src="/empty-placeholder.svg" alt="" className="w-80" />
            <p className="text-3xl font-bold">There is nothing here</p>
            <p className="text-center">
              Create an invoice by clicking the <b>New Invoice</b> button and
              get started
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {data.map((invoice) => (
              <li key={invoice.id}>
                <Link
                  to={`/invoice/${invoice.id}`}
                  className="flex justify-between items-center gap-2 pl-5 pr-2 py-3 bg-white hover:bg-gray-100 shadow rounded-xl"
                >
                  <div className="font-bold">
                    <span className="text-gray-600">#</span>
                    {invoice.id}
                  </div>
                  <span className="w-32 truncate">
                    {invoice.paymentDue
                      ? `Due ${formatDate(invoice.paymentDue)}`
                      : '-'}
                  </span>
                  <span className="w-40 truncate">
                    {invoice.clientName || '-'}
                  </span>
                  <span className="w-24 text-right truncate">
                    {invoice.total}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <InvoiceStatusBadge status={invoice.status} />
                    <ChevronRightIcon
                      width={20}
                      height={20}
                      className="text-gray-500"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const CreateInvoiceForm = (props: { onDismiss: () => void }) => {
  const { cleanup, initialValue } = usePersist({
    storageKey: 'createInvoice',
    getValue: () => form.getValues(),
  });

  const form = useInvoiceFormState(
    initialValue as unknown as InitialInvoiceData
  );

  const dismiss = () => {
    cleanup();
    props.onDismiss();
  };

  const { mutate: create, isLoading, error } = useCreateInvoice();

  const createData = (status: InvoiceStatus) => {
    form.handleSubmit((values) => {
      create(
        {
          ...values,
          status,
        },
        {
          onSuccess: dismiss,
        }
      );
    })();
  };

  return (
    <>
      <SlideOver.Content>
        <InvoiceForm form={form} error={error} />
      </SlideOver.Content>
      <SlideOver.Footer className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
        <Button onClick={dismiss} variant="light">
          Discard
        </Button>
        <div className="flex justify-center gap-2 flex-wrap">
          <Button
            onClick={() => createData('DRAFT')}
            variant="secondary"
            disabled={isLoading}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => createData('PENDING')}
            variant="primary"
            form="createForm"
            type="submit"
            disabled={isLoading}
          >
            Save {'&'} Send
          </Button>
        </div>
      </SlideOver.Footer>
    </>
  );
};
