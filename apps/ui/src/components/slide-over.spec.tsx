import { screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { setup } from '~/lib/test-helper';
import { SlideOver } from './slide-over';

describe('<SlideOver />', () => {
  it('works', async () => {
    const TestBed = () => {
      const [show, setShow] = React.useState(false);

      return (
        <>
          <button type="button" onClick={() => setShow(true)}>
            Open
          </button>
          <SlideOver open={show} onDismiss={() => setShow(false)}>
            <SlideOver.Header title="Test SlideOver" />
            <SlideOver.Content>
              <p>Content</p>
            </SlideOver.Content>
            <SlideOver.Footer>
              <button>Button</button>
            </SlideOver.Footer>
          </SlideOver>
        </>
      );
    };

    const { user } = setup(<TestBed />);

    await user.click(screen.getByText('Open'));

    expect(screen.getByText('Test SlideOver')).toBeVisible();

    await user.click(screen.getByText('Close panel'));

    await waitFor(() =>
      expect(screen.queryByText('Test SlideOver')).toBeNull()
    );
  });
});
