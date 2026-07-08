import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renders the chat page', () => {
    render(<App />);

    expect(screen.getByText('Great resource, thanks')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Message' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });
});
