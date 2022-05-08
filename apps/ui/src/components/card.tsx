import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div
    {...props}
    className={twMerge(
      'px-7 py-4 bg-white rounded-2xl shadow',
      props.className
    )}
  />
);
