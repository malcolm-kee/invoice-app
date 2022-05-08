import * as React from 'react';
import { Field, FieldProps } from './field';
import { TextInput, TextInputProps } from './text-input';

export interface TextFieldProps
  extends TextInputProps,
    Pick<FieldProps, 'label' | 'status' | 'helpText'> {
  fieldClass?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, fieldClass, status, helpText, ...props },
    forwardedRef
  ) {
    return (
      <Field
        label={label}
        className={fieldClass}
        status={status}
        helpText={helpText}
      >
        <TextInput {...props} ref={forwardedRef} />
      </Field>
    );
  }
);
