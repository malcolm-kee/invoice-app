import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const TableImpl = function Table({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'table'>) {
  return (
    <div className={twMerge('rounded shadow bg-gray-50', className)}>
      <table {...props} className="w-full" />
    </div>
  );
};

const Th = (props: React.ComponentPropsWithoutRef<'th'>) => (
  <th
    {...props}
    className={twMerge('px-3 py-2 text-left text-pgrey-300', props.className)}
  />
);

const Td = (props: React.ComponentPropsWithoutRef<'td'>) => (
  <td {...props} className={twMerge('px-3 py-1', props.className)} />
);

const Tfoot = (props: React.ComponentPropsWithoutRef<'tfoot'>) => (
  <tfoot {...props} className={twMerge('bg-gray-200', props.className)} />
);

export const Table = Object.assign(TableImpl, {
  Thead: 'thead' as const,
  Tr: 'tr' as const,
  Th,
  Tbody: 'tbody' as const,
  Td,
  Tfoot,
});
