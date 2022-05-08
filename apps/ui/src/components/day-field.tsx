import { DaySelector, DaySelectorProps } from './day-selector';
import { Field, FieldProps } from './field';

export interface DayFieldProps
  extends DaySelectorProps,
    Pick<FieldProps, 'label' | 'status' | 'helpText'> {
  fieldClass?: string;
}

export const DayField = ({
  label,
  helpText,
  status,
  fieldClass,
  ...props
}: DayFieldProps) => {
  return (
    <Field
      label={label}
      className={fieldClass}
      status={status}
      helpText={helpText}
    >
      <DaySelector {...props} />
    </Field>
  );
};
