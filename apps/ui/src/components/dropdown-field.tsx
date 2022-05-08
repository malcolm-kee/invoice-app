import { Listbox } from '@headlessui/react';
import { Dropdown, DropdownProps } from './dropdown';
import { Field, FieldProps } from './field';
import { Label } from './label';

export interface DropdownFieldProps<Value>
  extends Omit<DropdownProps<Value>, 'preButtonSlot'>,
    Pick<FieldProps, 'label' | 'status' | 'helpText'> {
  fieldClass?: string;
}

export const DropdownField = <Value extends unknown>({
  label,
  helpText,
  fieldClass,
  status,
  ...props
}: DropdownFieldProps<Value>) => {
  return (
    <Field className={fieldClass} status={status}>
      <Dropdown
        {...props}
        preButtonSlot={
          label || helpText ? (
            <div className="flex justify-between">
              {label ? (
                <Listbox.Label as={Label}>{label}</Listbox.Label>
              ) : (
                <span />
              )}
              {helpText ? (
                <span
                  className={`text-xs ${
                    status === 'error' ? 'text-error-500' : ''
                  }`}
                >
                  {helpText}
                </span>
              ) : null}
            </div>
          ) : undefined
        }
      />
    </Field>
  );
};
