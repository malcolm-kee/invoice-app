import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import cx from 'clsx';
import { useFieldControlContext } from './field-context';

export interface DropdownProps<Value>
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'value'> {
  value: Value | undefined | null;
  onChangeValue: (value: Value) => void;
  options: Array<{
    label: string;
    value: Value;
    selectedLabel?: string;
  }>;
  placeholder?: string;
  preButtonSlot?: React.ReactNode;
  variant?: 'field' | 'minimal';
}

export const Dropdown = <Value extends unknown>({
  value,
  options,
  onChangeValue,
  placeholder,
  className,
  disabled,
  preButtonSlot,
  variant = 'field',
  ...btnProps
}: DropdownProps<Value>) => {
  const selected = React.useMemo(
    () => options.find((option) => option.value === value),
    [value, options]
  );

  const { status } = useFieldControlContext(btnProps.id);

  return (
    <Listbox value={value} onChange={onChangeValue} disabled={disabled}>
      {({ open }) => (
        <>
          {preButtonSlot}
          <div className="relative">
            <Listbox.Button
              {...btnProps}
              className={twMerge(
                'h-[2.625rem] w-full text-left text-sm font-medium rounded focus:outline-none focus:border-primary-300 focus:ring-primary-300 focus-visible:ring-primary-300 focus-visible:border-primary-300',
                variant === 'field'
                  ? cx([
                      'form-select px-0',
                      status === 'error'
                        ? 'border-error-300'
                        : 'border-pgrey-200',
                      disabled ? 'bg-gray-100 text-gray-400' : 'bg-white',
                    ])
                  : 'flex items-center',
                open && 'border-primary-300 ring-1 ring-primary-300',
                className
              )}
            >
              <span
                className={cx(
                  'block truncate px-4',
                  variant === 'field' && !selected && 'text-gray-400',
                  variant === 'minimal' && 'flex-1'
                )}
              >
                {selected
                  ? selected.selectedLabel || selected.label
                  : placeholder}
              </span>
              {variant === 'minimal' && (
                <div className="pr-3">
                  <ChevronDownIcon
                    width={16}
                    height={16}
                    className="text-primary-500"
                  />
                </div>
              )}
            </Listbox.Button>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="z-10 focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    value={option.value}
                    className={({ active }) =>
                      `select-none cursor-pointer py-2 px-4 border-b last:border-b-0 ${
                        active ? 'text-primary-500' : 'text-black'
                      }`
                    }
                  >
                    {option.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
