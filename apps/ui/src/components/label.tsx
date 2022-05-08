import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldContext } from './field-context';

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<'label'>
>((props, forwardedRef) => {
  const { inputId } = React.useContext(FieldContext);

  return (
    <label
      htmlFor={inputId}
      {...props}
      className={twMerge('block text-sm text-pgrey-300', props.className)}
      ref={forwardedRef}
    />
  );
});
