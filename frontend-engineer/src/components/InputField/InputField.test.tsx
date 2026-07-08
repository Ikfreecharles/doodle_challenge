import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputField } from './InputField';

describe('InputField', () => {
  it('renders the provided message value', () => {
    render(<InputField value="Hello team" onChange={jest.fn()} />);

    expect(screen.getByTestId('input-field')).toHaveValue('Hello team');
  });

  it('applies the input field stylesheet class', () => {
    render(<InputField value="" onChange={jest.fn()} />);

    expect(
      screen.getByTestId('input-field').closest('.input-field')
    ).not.toBeNull();
  });

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<InputField value="" onChange={handleChange} />);

    await user.type(screen.getByTestId('input-field'), 'Hi');

    expect(handleChange).toHaveBeenCalledWith('H');
    expect(handleChange).toHaveBeenCalledWith('i');
  });
});
