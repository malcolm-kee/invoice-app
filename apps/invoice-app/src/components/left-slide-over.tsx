import { SlideOver, SlideOverProps } from 'ui';

export interface LeftSlideOverProps extends Omit<SlideOverProps, 'from'> {}

export const LeftSlideOver = (props: LeftSlideOverProps) => (
  <SlideOver from="left" {...props} rootClass="sm:pl-20" />
);
