import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button', () => {
  it('renders the send action', () => {
    render(<Button onClick={jest.fn()} />);

    expect(screen.getByTestId('button')).toHaveTextContent('Send');
  });

  it('applies the button stylesheet class', () => {
    render(<Button onClick={jest.fn()} />);

    expect(screen.getByTestId('button')).toHaveClass('button');
  });

  it('calls onClick when selected', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} />);

    await user.click(screen.getByTestId('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button onClick={jest.fn()} disabled />);

    expect(screen.getByTestId('button')).toBeDisabled();
  });
});
