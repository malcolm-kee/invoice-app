import { Dialog as OriDialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface DialogProps {
  open: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

const DialogImpl = function Dialog(props: DialogProps) {
  return (
    <Transition show={props.open} as={React.Fragment}>
      <OriDialog onClose={props.onDismiss}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <OriDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {props.children}
              </OriDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </OriDialog>
    </Transition>
  );
};

const DialogTitle = (props: React.ComponentPropsWithoutRef<'h2'>) => (
  <OriDialog.Title
    {...props}
    className={twMerge(
      'text-2xl font-medium leading-6 text-gray-900',
      props.className
    )}
  />
);

export const Dialog = Object.assign(DialogImpl, {
  Title: DialogTitle,
});
