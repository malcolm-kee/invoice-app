import { screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { setup } from '~/lib/test-helper';
import { DayField } from './day-field';

describe('<DayField />', () => {
  it('works', async () => {
    const TestBed = () => {
      const [value, setValue] = React.useState<undefined | string>(undefined);

      return (
        <DayField
          value={value}
          onChangeValue={setValue}
          placeholder="Select"
          label="Date"
        />
      );
    };

    const { user } = setup(<TestBed />);

    await user.click(screen.getByText('Select'));

    await user.click(screen.getByText('3'));

    await waitFor(() => {
      expect(screen.getByRole('button')).not.toHaveTextContent('Select');
    });
  });
});
