import { InvoiceStatus } from 'invoice-api';
import { twMerge } from 'tailwind-merge';

export interface InvoiceStatusBadgeProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> {
  status: InvoiceStatus;
}

export const InvoiceStatusBadge = ({
  status,
  className,
  ...props
}: InvoiceStatusBadgeProps) => {
  return (
    <span
      {...props}
      className={twMerge(
        'flex justify-center items-center gap-2 w-28 pl-2 pr-3 py-2 font-bold rounded-lg capitalize bg-opacity-25',
        {
          DRAFT: 'bg-gray-400 text-gray-600',
          PAID: 'bg-green-400 text-green-600',
          PENDING: 'bg-orange-400 text-orange-600',
        }[status],
        className
      )}
    >
      <span
        className={`w-2 h-2 rounded-lg ${
          {
            DRAFT: 'bg-gray-600',
            PAID: 'bg-green-600',
            PENDING: 'bg-orange-600',
          }[status]
        }`}
      />
      {status.toLowerCase()}
    </span>
  );
};
