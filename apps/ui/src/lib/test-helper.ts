import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

export const setup = (
  ui: React.ReactElement
): ReturnType<typeof render> & {
  user: ReturnType<typeof userEvent['setup']>;
} => {
  const user = userEvent.setup();

  return {
    ...render(ui),
    user,
  };
};
