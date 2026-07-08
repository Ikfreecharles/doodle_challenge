import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renders the chat page heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /team chat/i })
    ).toBeInTheDocument();
  });
});

