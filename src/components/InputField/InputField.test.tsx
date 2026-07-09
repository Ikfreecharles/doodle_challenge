import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { InputField } from './InputField';
import { AppThemeProvider } from '../../theme/AppThemeProvider';

const renderInputField = (inputField: ReactElement) => {
  return render(<AppThemeProvider>{inputField}</AppThemeProvider>);
};

const getInputField = () => screen.getByTestId('input-field');
const getInputFieldInput = () => screen.getByTestId('input-field-input');

describe('InputField', () => {
  it('renders the provided message value', () => {
    renderInputField(<InputField value="Hello team" onChange={jest.fn()} />);

    expect(getInputFieldInput()).toHaveValue('Hello team');
  });

  it('renders Message as the default placeholder', () => {
    renderInputField(<InputField value="" onChange={jest.fn()} />);

    expect(getInputFieldInput()).toHaveAttribute('placeholder', 'Message');
  });

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    renderInputField(<InputField value="" onChange={handleChange} />);
    await user.type(getInputFieldInput(), 'Hi');

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('calls onKeyDown when the user presses Enter', async () => {
    const user = userEvent.setup();
    const handleKeyDown = jest.fn();

    renderInputField(
      <InputField value="" onChange={jest.fn()} onKeyDown={handleKeyDown} />
    );
    await user.type(getInputFieldInput(), '{Enter}');

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('renders with a white background', () => {
    renderInputField(<InputField value="" onChange={jest.fn()} />);

    expect(getComputedStyle(getInputField()).backgroundColor).toBe(
      'rgb(255, 255, 255)'
    );
  });

  it('renders with the border radius', () => {
    renderInputField(<InputField value="" onChange={jest.fn()} />);

    expect(getComputedStyle(getInputField()).borderRadius).toBe('5px');
  });

  it('renders with the input height and horizontal padding', () => {
    renderInputField(<InputField value="" onChange={jest.fn()} />);

    expect(getComputedStyle(getInputField()).height).toBe('60px');
    expect(getComputedStyle(getInputField()).paddingLeft).toBe('8px');
    expect(getComputedStyle(getInputField()).paddingRight).toBe('8px');
  });

  it('can be disabled', () => {
    renderInputField(<InputField value="" onChange={jest.fn()} disabled />);

    expect(getInputFieldInput()).toBeDisabled();
  });
});

describe("InputField's accessibility", () => {
  it('renders as an accessible textbox named by the placeholder', () => {
    renderInputField(<InputField value="" onChange={jest.fn()} />);

    expect(
      screen.getByRole('textbox', { name: 'Message' })
    ).toBeInTheDocument();
  });

  it('uses a custom placeholder as the accessible textbox name', () => {
    renderInputField(
      <InputField
        value=""
        onChange={jest.fn()}
        placeholder="Write a chat message"
      />
    );

    expect(
      screen.getByRole('textbox', { name: 'Write a chat message' })
    ).toBeInTheDocument();
  });

  it('communicates disabled state to assistive technology', () => {
    renderInputField(<InputField value="" onChange={jest.fn()} disabled />);

    expect(screen.getByRole('textbox', { name: 'Message' })).toBeDisabled();
  });

  it('can receive keyboard focus', async () => {
    const user = userEvent.setup();

    renderInputField(<InputField value="" onChange={jest.fn()} />);

    await user.tab();

    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveFocus();
  });
});
