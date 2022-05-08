import { ValidationError } from 'invoice-api';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import {
  DayField,
  DayFieldProps,
  DropdownField,
  DropdownFieldProps,
  FetchError,
  TextField,
  TextFieldProps,
  TextInput,
  TextInputProps,
} from 'ui';

const FieldErrorContext = React.createContext<Record<string, string>>({});

export const useFieldError = (fieldName: string) => {
  const errors = React.useContext(FieldErrorContext);

  return errors[fieldName];
};

export const FieldErrorContextProvider = (props: {
  children: React.ReactNode;
  error?: unknown;
}) => {
  const [validationErrors, setValidationErrors] = React.useState<
    ValidationError | undefined
  >(undefined);

  const validationMessageMap = React.useMemo(
    () =>
      validationErrors
        ? validationErrors.reduce<Record<string, string>>(
            (result, err) => ({
              ...result,
              [err.path.join('.')]: err.message,
            }),
            {}
          )
        : {},
    [validationErrors]
  );

  React.useEffect(() => {
    if (props.error) {
      if (props.error instanceof FetchError) {
        props.error.response.json().then((result) => {
          if (Array.isArray(result)) {
            setValidationErrors(result);
          }
        });
      } else {
      }
    }
  }, [props.error]);

  return (
    <FieldErrorContext.Provider value={validationMessageMap}>
      {props.children}
    </FieldErrorContext.Provider>
  );
};

export const FormTextField = React.forwardRef<
  HTMLInputElement,
  TextFieldProps & { name: string }
>(function FormTextField(props, ref) {
  const fieldError = useFieldError(props.name);

  return (
    <TextField
      status={fieldError ? 'error' : undefined}
      helpText={fieldError}
      {...props}
      ref={ref}
    />
  );
});

export const FormTextInput = React.forwardRef<
  HTMLInputElement,
  TextInputProps & { name: string }
>(function FormTextInput(props, ref) {
  const fieldError = useFieldError(props.name);

  return (
    <TextInput
      {...props}
      className={twMerge(fieldError ? 'border-error-300' : '', props.className)}
      ref={ref}
    />
  );
});

export interface FormDayFieldProps
  extends Omit<DayFieldProps, 'value' | 'onChangeValue'> {
  name: string;
}

export const FormDayField = ({ name, ...props }: FormDayFieldProps) => {
  const form = useFormContext();
  const fieldError = useFieldError(name);

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <DayField
          value={field.value}
          onChangeValue={field.onChange}
          status={fieldError ? 'error' : undefined}
          helpText={fieldError}
          {...props}
        />
      )}
    />
  );
};

export interface FormDropdownFieldProps<Value>
  extends Omit<DropdownFieldProps<Value>, 'value' | 'onChangeValue'> {
  name: string;
}

export const FormDropdownField = <Value extends unknown>({
  name,
  ...props
}: FormDropdownFieldProps<Value>) => {
  const form = useFormContext();
  const fieldError = useFieldError(name);

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <DropdownField
          value={field.value}
          onChangeValue={field.onChange}
          status={fieldError ? 'error' : undefined}
          helpText={fieldError}
          {...props}
        />
      )}
    />
  );
};
