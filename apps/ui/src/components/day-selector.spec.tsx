import { screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { setup } from '~/lib/test-helper';
import { DaySelector } from './day-selector';

describe('<DaySelector />', () => {
  it('works', async () => {
    const TestBed = () => {
      const [value, setValue] = React.useState<undefined | string>(undefined);

      return (
        <DaySelector
          value={value}
          onChangeValue={setValue}
          placeholder="Select"
        />
      );
    };

    const { user } = setup(<TestBed />);

    await user.click(screen.getByText('Select'));

    await user.click(screen.getByLabelText('Go to next month'));
    await user.click(screen.getByLabelText('Go to previous month'));

    await user.click(screen.getByText('3'));

    await waitFor(() => {
      expect(screen.getByRole('button')).not.toHaveTextContent('Select');
    });
  });
});
