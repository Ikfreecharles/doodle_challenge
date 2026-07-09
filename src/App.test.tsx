import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { App } from './App';
import { AppThemeProvider } from './theme/AppThemeProvider';
import { createAppStore } from './store/store';
import { fetchMessages } from './api/messagesApi';

jest.mock('./api/messagesApi', () => ({
  fetchMessages: jest.fn(),
}));

const messages = [
  {
    _id: '1',
    author: 'Ninja',
    message: 'Great resource, thanks',
    createdAt: '2018-03-10T09:55:00.000Z',
  },
];

describe('App', () => {
  const mockedFetchMessages = jest.mocked(fetchMessages);

  beforeEach(() => {
    mockedFetchMessages.mockResolvedValue(messages);
  });

  it('renders the chat page', async () => {
    const testStore = createAppStore();

    render(
      <Provider store={testStore}>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </Provider>
    );

    expect(
      await screen.findByText('Great resource, thanks')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Message' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });
});
