import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldContext } from './field-context';
import { Label } from './label';

type FieldWrapperProps = React.ComponentPropsWithoutRef<'div'> & {
  status?: 'success' | 'error';
};

const FieldWrapper = ({ status, ...props }: FieldWrapperProps) => {
  const [inputId, setInputId] = React.useState('');

  return (
    <FieldContext.Provider
      value={React.useMemo(
        () => ({
          inputId,
          setInputId,
          status,
        }),
        [inputId, status]
      )}
    >
      <div {...props} />
    </FieldContext.Provider>
  );
};

export interface FieldProps extends FieldWrapperProps {
  label?: React.ReactNode;
  children: React.ReactNode;
  helpText?: React.ReactNode;
}

export const Field = ({
  label,
  helpText,
  children,
  className,
  ...divProps
}: FieldProps) => {
  return (
    <FieldWrapper
      {...divProps}
      className={twMerge('flex flex-col gap-1', className)}
    >
      {label || helpText ? (
        <div className="flex justify-between">
          {label ? <Label>{label}</Label> : <span />}
          {helpText ? (
            <span
              className={`text-xs ${
                divProps.status === 'error' ? 'text-error-500' : ''
              }`}
            >
              {helpText}
            </span>
          ) : null}
        </div>
      ) : null}
      {children}
    </FieldWrapper>
  );
};
