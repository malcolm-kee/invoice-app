import { screen } from '@testing-library/react';
import * as React from 'react';
import { setup } from '~/lib/test-helper';
import { DropdownField, DropdownFieldProps } from './dropdown-field';

describe('<DropdownField />', () => {
  it('works', async () => {
    const { user } = setup(<TestBed />);

    await user.click(screen.getByText('Pokemon'));

    expect(screen.getByText('Select pokemon').closest('button')).toHaveFocus();

    await user.click(screen.getByText('Select pokemon'));
    await user.click(screen.getByRole('option', { name: 'Pikachu' }));

    expect(screen.getByRole('button')).toHaveTextContent('Pikachu');
  });

  interface Pokemon {
    name: string;
    sequence: number;
  }

  const options = [
    {
      value: {
        name: 'Bulbasaur',
        sequence: 1,
      },
      label: 'Bulbasaur',
    },
    {
      value: {
        name: 'Pikachu',
        sequence: 25,
      },
      label: 'Pikachu',
    },
  ];

  const TestBed = (props: Partial<DropdownFieldProps<Pokemon | undefined>>) => {
    const [value, setValue] = React.useState<undefined | Pokemon>(undefined);

    return (
      <DropdownField
        value={value}
        onChangeValue={setValue}
        options={options}
        placeholder="Select pokemon"
        label="Pokemon"
        {...props}
      />
    );
  };
});
