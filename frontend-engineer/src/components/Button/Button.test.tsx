import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

import { Button } from './Button';
import { AppThemeProvider } from '../../theme/AppThemeProvider';

const renderButton = (button: ReactElement) => {
  return render(<AppThemeProvider>{button}</AppThemeProvider>);
};

const getButton = () => screen.getByTestId('button');

describe('Button', () => {
  it('renders the send action', () => {
    renderButton(<Button onClick={jest.fn()} />);

    expect(getButton()).toHaveTextContent('Send');
  });

  it('renders custom button content', () => {
    renderButton(<Button content="Retry" onClick={jest.fn()} />);

    expect(getButton()).toHaveTextContent('Retry');
  });

  it('calls onClick when selected', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    renderButton(<Button onClick={handleClick} />);

    await user.click(getButton());

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    renderButton(<Button onClick={jest.fn()} disabled />);

    expect(getButton()).toBeDisabled();
  });

  it('renders with the background, text color, border radius, padding, height and no shadow', () => {
    renderButton(<Button onClick={jest.fn()} />);

    expect(getComputedStyle(getButton()).backgroundColor).toBe(
      'rgb(255, 127, 101)'
    );
    expect(getComputedStyle(getButton()).color).toBe('rgb(255, 255, 255)');
    expect(getComputedStyle(getButton()).borderRadius).toBe('5px');
    expect(getComputedStyle(getButton()).boxShadow).toBe('none');
    expect(getComputedStyle(getButton()).height).toBe('60px');
    expect(getComputedStyle(getButton()).padding).toBe('0px 24px');
  });

  it('should have a margin of 8px all around except left', () => {
    renderButton(<Button onClick={jest.fn()} />);
    expect(getComputedStyle(getButton()).margin).toBe('8px 8px 8px 0px');
  });
});

describe("Button's accessibility", () => {
  it('renders as an accessible button named Send', () => {
    renderButton(<Button onClick={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('uses custom content as the accessible button name', () => {
    renderButton(<Button content="Retry" onClick={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('communicates disabled state to assistive technology', () => {
    renderButton(<Button onClick={jest.fn()} disabled />);

    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('can receive keyboard focus', async () => {
    const user = userEvent.setup();

    renderButton(<Button onClick={jest.fn()} />);

    await user.tab();

    expect(screen.getByRole('button', { name: 'Send' })).toHaveFocus();
  });
});
