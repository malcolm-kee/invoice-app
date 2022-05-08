import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { formatDate, formatDateUtc, toDate } from '~/lib/date';
import { DayPicker } from './day-picker';
import { useFieldControlContext } from './field-context';

export interface DaySelectorProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'value' | 'children'> {
  value: string | undefined | null;
  onChangeValue: (date: string) => void;
  placeholder?: string;
}

export const DaySelector = ({
  value,
  onChangeValue,
  className,
  placeholder,
  ...btnProps
}: DaySelectorProps) => {
  const label = React.useMemo(() => value && formatDate(value), [value]);

  const { inputId, status } = useFieldControlContext(btnProps.id);

  return (
    <Popover className="relative inline-block" id={inputId}>
      {({ open, close }) => (
        <>
          <Popover.Button
            {...btnProps}
            className={twMerge(
              'form-input flex items-center h-[2.625rem] text-left text-sm font-medium px-4 w-40 rounded focus:outline-none focus:border-primary-300 focus:ring-primary-300 focus-visible:ring-primary-300 focus-visible:border-primary-300',
              status === 'error' ? 'border-error-300' : 'border-pgrey-200',
              btnProps.disabled ? 'bg-gray-100 text-gray-400' : 'bg-white',
              open && 'border-primary-300 ring-1 ring-primary-300',
              className
            )}
          >
            <span
              className={twMerge(
                'flex-1 block truncate',
                !label && 'text-gray-400'
              )}
            >
              {label || placeholder}
            </span>
            <span className="inline-flex items-center">
              <CalendarIcon
                width={20}
                height={20}
                aria-hidden
                className="text-pgrey-200"
              />
            </span>
          </Popover.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-0 z-10 mt-3 transform bg-white rounded-md shadow-lg">
              <DayPicker
                mode="single"
                selected={(value && toDate(value)) || undefined}
                onSelect={(val) => {
                  if (val) {
                    onChangeValue(formatDateUtc(val));
                    close();
                  }
                }}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
