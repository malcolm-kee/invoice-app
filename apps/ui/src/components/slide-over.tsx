import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { createNamedContext } from '~/lib/create-named-context';
import { noop } from '~/lib/fn-lib';

type SlideOverContextType = {
  onDismiss: () => void;
};

const SlideOverContext = createNamedContext<SlideOverContextType>(
  'SlideOverContext',
  {
    onDismiss: noop,
  }
);

export interface SlideOverProps {
  open: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  from?: 'right' | 'left';
  rootClass?: string;
  className?: string;
}

const SlideOverImpl = function SlideOver({
  open,
  onDismiss,
  children,
  from = 'right',
  rootClass,
  className,
}: SlideOverProps) {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={onDismiss}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-gray-600 bg-opacity-20" />

          <div
            className={twMerge(
              'pointer-events-none fixed inset-y-0 flex max-w-full',
              from === 'right' ? 'right-0 sm:pl-10' : 'left-0 sm:pr-10',
              rootClass
            )}
          >
            <Transition.Child
              as={React.Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom={
                from === 'right' ? 'translate-x-full' : '-translate-x-full'
              }
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo={
                from === 'right' ? 'translate-x-full' : '-translate-x-full'
              }
            >
              <div className="pointer-events-auto w-screen max-w-2xl">
                <div
                  className={twMerge(
                    'flex h-full flex-col bg-white py-6 shadow-xl',
                    className
                  )}
                >
                  <SlideOverContext.Provider
                    value={{
                      onDismiss,
                    }}
                  >
                    {children}
                  </SlideOverContext.Provider>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const SlideOverHeader = ({
  title,
  showDismissBtn = true,
}: {
  title: string;
  showDismissBtn?: boolean;
}) => {
  const { onDismiss } = React.useContext(SlideOverContext);

  return (
    <div className="px-4 sm:px-6">
      <div className="flex items-start justify-between">
        <Dialog.Title className="text-2xl font-medium text-gray-900">
          {title}
        </Dialog.Title>
        {showDismissBtn && (
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onDismiss}
            >
              <span className="sr-only">Close panel</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SlideOverContent = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div
    {...props}
    className={twMerge(
      'mt-6 flex-1 px-4 sm:px-6 overflow-y-auto',
      props.className
    )}
  />
);

const SlideOverFooter = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...props} className={twMerge('px-4 pt-4 sm:px-6', props.className)} />
);

export const SlideOver = Object.assign(SlideOverImpl, {
  Header: SlideOverHeader,
  Content: SlideOverContent,
  Footer: SlideOverFooter,
});
