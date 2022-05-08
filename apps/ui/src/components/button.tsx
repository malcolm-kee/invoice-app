import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'red' | 'light';
  LeftIcon?: React.ComponentType<{
    className?: string;
    width?: number;
    height?: number;
  }>;
  width?: 'full';
  /**
   * callback function to customize the root HTML element
   */
  render?: (btnProps: {
    className: string;
    children: React.ReactNode;
  }) => React.ReactElement | null;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'primary', LeftIcon, children, width, render, ...props },
    forwardedRef
  ) {
    const content = (
      <>
        {LeftIcon ? (
          <span className="block p-1.5 bg-white rounded-full">
            <LeftIcon
              width={20}
              height={20}
              className={
                {
                  primary: 'text-primary-500',
                  secondary: 'text-grey-700',
                  red: 'text-error-500',
                  light: 'text-grey-600',
                }[variant]
              }
            />
          </span>
        ) : null}
        <span className="text-sm font-medium px-3 py-3">{children}</span>
      </>
    );

    const className = twMerge(
      'inline-flex items-center px-2 rounded-3xl disabled:bg-white disabled:text-pgrey-200',
      width === 'full' ? 'w-full justify-center' : 'justify-between',
      {
        primary: 'text-white bg-primary-500 hover:bg-primary-300',
        secondary: 'text-pgrey-200 bg-grey-700 hover:bg-grey-800',
        red: 'text-white bg-error-500 hover:bg-error-300',
        light: 'text-grey-600 bg-grey-100 hover:bg-pgrey-200',
      }[variant],
      props.className
    );

    if (render) {
      return render({
        className,
        children: content,
      });
    }

    return (
      <button type="button" {...props} className={className} ref={forwardedRef}>
        {content}
      </button>
    );
  }
);
