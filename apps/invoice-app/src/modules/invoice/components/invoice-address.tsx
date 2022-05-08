import { Address } from 'invoice-api';
import { twMerge } from 'tailwind-merge';
import * as React from 'react';

export interface InvoiceAddressProps
  extends Omit<React.ComponentPropsWithoutRef<'address'>, 'children'> {
  address: Address;
}

export const InvoiceAddress = ({
  address,
  className,
  ...restProps
}: InvoiceAddressProps) => (
  <address
    {...restProps}
    className={twMerge('text-sm text-gray-600 not-italic', className)}
  >
    {[address.street, address.city, address.postCode, address.country]
      .filter(Boolean)
      .map((row, index, all) =>
        index === all.length - 1 ? (
          row
        ) : (
          <React.Fragment key={index}>
            {row}
            <br />
          </React.Fragment>
        )
      )}
  </address>
);
