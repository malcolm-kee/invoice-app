import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface FieldsetProps
  extends React.ComponentPropsWithoutRef<'fieldset'> {
  legend?: string;
}

export const Fieldset = ({
  legend,
  children,
  className,
  ...props
}: FieldsetProps) => (
  <fieldset {...props} className={twMerge('mt-10 first:mt-0', className)}>
    {legend && (
      <legend className="block mb-3 text-sm text-primary-500 font-medium">
        {legend}
      </legend>
    )}
    <div className="flex flex-col gap-4">{children}</div>
  </fieldset>
);
