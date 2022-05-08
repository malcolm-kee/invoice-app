import { screen } from '@testing-library/react';
import { setup } from '~/lib/test-helper';
import { Button } from './button';

describe('<Button />', () => {
  it('accepts any props button receives', async () => {
    const onClick = jest.fn();

    const { user } = setup(<Button onClick={onClick}>Hello</Button>);

    await user.click(screen.getByText('Hello'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('can customize element with render', async () => {
    setup(
      <Button
        variant="red"
        width="full"
        render={(btnProps) => <a href="/somewhere" {...btnProps} />}
      >
        Bye
      </Button>
    );

    expect(screen.getByRole('link')).toHaveTextContent('Bye');
  });
});
