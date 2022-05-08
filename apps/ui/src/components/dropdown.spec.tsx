import { screen } from '@testing-library/react';
import * as React from 'react';
import { setup } from '~/lib/test-helper';
import { Dropdown, DropdownProps } from './dropdown';

describe('<Dropdown />', () => {
  it('works', async () => {
    const { user } = setup(<TestBed />);

    await user.click(screen.getByText('Select pokemon'));
    await user.click(screen.getByRole('option', { name: 'Pikachu' }));

    expect(screen.getByRole('button')).toHaveTextContent('Pikachu');
  });

  it('allow disabled', async () => {
    const { user } = setup(<TestBed disabled />);
    await user.click(screen.getByText('Select pokemon'));

    expect(screen.queryByRole('option')).toBeNull();
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

  const TestBed = (props: Partial<DropdownProps<Pokemon | undefined>>) => {
    const [value, setValue] = React.useState<undefined | Pokemon>(undefined);

    return (
      <Dropdown
        value={value}
        onChangeValue={setValue}
        options={options}
        placeholder="Select pokemon"
        {...props}
      />
    );
  };
});
