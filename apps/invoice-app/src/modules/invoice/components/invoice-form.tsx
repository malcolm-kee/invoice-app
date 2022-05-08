import { TrashIcon } from '@heroicons/react/outline';
import { addDays } from 'date-fns';
import {
  CreateInvoiceBody,
  DataToJson,
  Invoice,
  InvoiceItem,
} from 'invoice-api';
import * as React from 'react';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';
import { Button, Fieldset, formatDateUtc, Table, toDate } from 'ui';
import {
  FieldErrorContextProvider,
  FormDayField,
  FormDropdownField,
  FormTextField,
  FormTextInput,
  useFieldError,
} from '~/components/form';
import { getNumberValue } from '~/lib/number';
import { NumToString } from '~/lib/type-helper';

type InvoiceItemValue = DataToJson<
  Omit<InvoiceItem, 'id' | 'invoiceId' | 'total'>
>;

export interface InvoiceFormValues
  extends Omit<DataToJson<CreateInvoiceBody>, 'items'> {
  items: Array<NumToString<InvoiceItemValue>>;
}

export type InitialInvoiceData = Invoice;

const getInitialValues = (
  currentData: InitialInvoiceData
): InvoiceFormValues => {
  const {
    clientAddress,
    senderAddress,
    invoiceItems,
    total,
    id,
    clientAddressId,
    senderAddressId,
    ...rest
  } = currentData;

  return {
    ...rest,
    clientAddress: clientAddress || {
      street: '',
      postCode: '',
      city: '',
      country: '',
    },
    senderAddress: senderAddress || {
      street: '',
      postCode: '',
      city: '',
      country: '',
    },
    items: (invoiceItems || []).map((item) => ({
      ...item,
      quantity: String(item.quantity),
    })),
  };
};

export const useInvoiceFormState = (currentData?: InitialInvoiceData) => {
  const form = useForm<InvoiceFormValues>({
    defaultValues: currentData && getInitialValues(currentData),
  });

  return {
    ...form,
    handleSubmit: (
      onValid: SubmitHandler<
        Omit<InvoiceFormValues, 'items'> & {
          items: Array<InvoiceItemValue & { id?: number }>;
          total: number;
        }
      >
    ) => {
      return form.handleSubmit(({ items, ...values }) => {
        const invoiceItems = items.map((item) => ({
          ...item,
          quantity: getNumberValue(item.quantity),
          total: getNumberValue(item.quantity) * getNumberValue(item.price),
        }));

        const issueDataValue = values.issueDate && toDate(values.issueDate);
        const paymentDue =
          issueDataValue && values.paymentTerms
            ? formatDateUtc(addDays(issueDataValue, values.paymentTerms + 1))
            : null;

        onValid({
          ...values,
          items: invoiceItems,
          total: invoiceItems.reduce((total, item) => total + item.total, 0),
          paymentDue,
        });
      });
    },
  };
};

export interface InvoiceFormProps
  extends React.ComponentPropsWithoutRef<'form'> {
  form: ReturnType<typeof useInvoiceFormState>;
  error: unknown;
}

export const InvoiceForm = ({
  form,
  error,
  ...formProps
}: InvoiceFormProps) => {
  const { register } = form;
  return (
    <FieldErrorContextProvider error={error}>
      <FormProvider {...(form as unknown as UseFormReturn<InvoiceFormValues>)}>
        <form {...formProps}>
          <Fieldset legend="Bill From">
            <FormTextField
              label="Street Address"
              {...register('senderAddress.street')}
            />
            <div className="contents md:flex md:gap-3">
              <FormTextField
                label="City"
                fieldClass="flex-1"
                {...register('senderAddress.city')}
              />
              <FormTextField
                label="Post Code"
                fieldClass="flex-1"
                {...register('senderAddress.postCode')}
              />
              <FormTextField
                label="Country"
                fieldClass="flex-1"
                {...register('senderAddress.country')}
              />
            </div>
          </Fieldset>
          <Fieldset legend="Bill To">
            <FormTextField label="Client's Name" {...register('clientName')} />
            <FormTextField
              label="Client's Email"
              type="email"
              {...register('clientEmail')}
            />
            <FormTextField
              label="Street Address"
              {...register('clientAddress.street')}
            />
            <div className="contents md:flex md:gap-3">
              <FormTextField
                label="City"
                fieldClass="flex-1"
                {...register('clientAddress.city')}
              />
              <FormTextField
                label="Post Code"
                fieldClass="flex-1"
                {...register('clientAddress.postCode')}
              />
              <FormTextField
                label="Country"
                fieldClass="flex-1"
                {...register('clientAddress.country')}
              />
            </div>
          </Fieldset>
          <Fieldset>
            <div className="contents md:flex md:gap-3">
              <FormDayField
                label="Issue Date"
                name="issueDate"
                fieldClass="flex-1"
                className="w-full"
              />
              <FormDropdownField
                label="Payment Terms"
                name="paymentTerms"
                options={paymentTermsOptions}
                fieldClass="flex-1"
                className="w-full"
              />
            </div>
            <FormTextField
              label="Project Description"
              {...register('description')}
            />
          </Fieldset>
          <Fieldset>
            <h3 className="text-xl text-gray-600">Item List</h3>
            <InvoiceItemList />
          </Fieldset>
        </form>
      </FormProvider>
    </FieldErrorContextProvider>
  );
};

const InvoiceItemList = () => {
  const { register, control } = useFormContext<InvoiceFormValues>();

  const values =
    (useWatch<InvoiceFormValues>({
      name: 'items',
      control,
    }) as Array<NumToString<InvoiceItemValue>>) || [];

  const { fields, append, remove } = useFieldArray<InvoiceFormValues>({
    name: 'items',
  });

  const error = useFieldError('items');

  return (
    <div className="space-y-5">
      {error && <p className="text-error-500">{error}</p>}
      {fields.length > 0 && (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Item Name</Table.Th>
              <Table.Th>Qty</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {fields.map((field, index) => {
              const value = values[index];

              const total = value
                ? getNumberValue(value.price) * getNumberValue(value.quantity)
                : 0;

              return (
                <Table.Tr key={field.id}>
                  <Table.Td>
                    <FormTextInput {...register(`items.${index}.name`)} />
                  </Table.Td>
                  <Table.Td>
                    <FormTextInput
                      type="number"
                      className="w-20"
                      {...register(`items.${index}.quantity`)}
                    />
                  </Table.Td>
                  <Table.Td>
                    <FormTextInput
                      type="number"
                      className="w-36"
                      {...register(`items.${index}.price`)}
                    />
                  </Table.Td>
                  <Table.Td>{total}</Table.Td>
                  <Table.Td>
                    <button onClick={() => remove(index)} type="button">
                      <TrashIcon
                        width={20}
                        height={20}
                        className="text-gray-600"
                      />
                    </button>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      )}
      <Button
        onClick={() =>
          append({
            name: '',
            quantity: '',
            price: '',
          })
        }
        variant="light"
        width="full"
      >
        Add New Item
      </Button>
    </div>
  );
};

const paymentTermsOptions = [
  {
    label: 'Net 1 Day',
    value: 1,
  },
  {
    label: 'Net 7 Days',
    value: 7,
  },
  {
    label: 'Net 14 Days',
    value: 14,
  },
  {
    label: 'Net 30 Days',
    value: 30,
  },
];
