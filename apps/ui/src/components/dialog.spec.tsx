import { screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { setup } from '~/lib/test-helper';
import { Dialog } from './dialog';

describe('<Dialog />', () => {
  it('works', async () => {
    const TestBed = () => {
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        <>
          <button onClick={() => setIsOpen(true)} type="button">
            Open
          </button>
          <Dialog open={isOpen} onDismiss={() => setIsOpen(false)}>
            <Dialog.Title>Dialog Title</Dialog.Title>
            <button>Close</button>
          </Dialog>
        </>
      );
    };

    const { user } = setup(<TestBed />);

    await user.click(screen.getByText('Open'));

    expect(screen.getByText('Dialog Title')).toBeVisible();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByText('Dialog Title')).toBeNull());
  });
});
