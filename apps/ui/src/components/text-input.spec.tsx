import { screen } from '@testing-library/react';
import * as React from 'react';
import { setup } from '~/lib/test-helper';
import { TextInput } from './text-input';

describe('<TextInput />', () => {
  it('works', async () => {
    const TestBed = () => {
      const [value, setValue] = React.useState('');

      return <TextInput value={value} onChangeValue={setValue} />;
    };

    const { user } = setup(<TestBed />);

    await user.type(screen.getByRole('textbox'), 'Hello');

    expect(screen.getByRole('textbox')).toHaveValue('Hello');
  });
});
