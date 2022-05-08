import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { callAll } from '~/lib/fn-lib';
import { useFieldControlContext } from './field-context';

export interface TextInputProps
  extends React.ComponentPropsWithoutRef<'input'> {
  onChangeValue?: (value: string) => void;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { onChange, onChangeValue, className, ...props },
    forwardedRef
  ) {
    const { inputId, status } = useFieldControlContext(props.id);

    return (
      <input
        type="text"
        {...props}
        id={inputId}
        onChange={callAll(
          onChange,
          onChangeValue && ((ev) => onChangeValue(ev.target.value))
        )}
        className={twMerge(
          'text-sm font-medium px-4 rounded focus:outline-none focus-visible:ring-primary-300 focus-visible:border-primary-300',
          status === 'error' ? 'border-error-300' : 'border-pgrey-200',
          props.disabled ? 'bg-gray-100 text-gray-400' : 'bg-white',
          className
        )}
        ref={forwardedRef}
      />
    );
  }
);
