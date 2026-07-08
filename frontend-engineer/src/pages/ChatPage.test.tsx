import { render, screen } from '@testing-library/react';

import { ChatPage } from './ChatPage';
import { AppThemeProvider } from '../theme/AppThemeProvider';
import { ReactElement } from 'react';

const renderChatPage = (chatPage: ReactElement) => {
  return render(<AppThemeProvider>{chatPage}</AppThemeProvider>);
};

describe('ChatPage', () => {
  it('renders the chat messages', () => {
    // test case will be updated when business logic is wired in
    renderChatPage(<ChatPage />);

    expect(screen.getByText('Great resource, thanks')).toBeInTheDocument();
    expect(screen.getByText('THANKSSSS!!!!!')).toBeInTheDocument();
    expect(screen.getByText('Thanks Peter')).toBeInTheDocument();
    expect(screen.getByText('Sounds good to me!')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Hey folks! I wanted to get in touch with you regarding the project. Please, let me know how you plan to contribute.'
      )
    ).toBeInTheDocument();
  });

  it('renders the message composer', () => {
    renderChatPage(<ChatPage />);

    expect(
      screen.getByRole('textbox', { name: 'Message' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });
});

describe("ChatPage's layout", () => {
  it('renders the chat interface with the body background image', () => {
    renderChatPage(<ChatPage />);

    expect(screen.getByTestId('chat-page')).toHaveStyle({
      backgroundImage: 'url(/src/assets/Body BG.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: '768px 590px',
    });
  });

  it('renders an inner message container with a max width of 640px', () => {
    renderChatPage(<ChatPage />);

    expect(screen.getByTestId('chat-page-inner')).toHaveStyle({
      maxWidth: '640px',
    });
  });

  it('centers the message thread on the screen', () => {
    renderChatPage(<ChatPage />);

    expect(screen.getByTestId('chat-page-inner')).toHaveStyle({
      margin: '0px auto',
    });
  });

  it('renders a primary colored message composer bar', () => {
    renderChatPage(<ChatPage />);

    expect(
      getComputedStyle(screen.getByTestId('chat-page-composer')).backgroundColor
    ).toBe('rgb(28, 143, 202)');
  });

  it('lays out the input and send button in the composer', () => {
    renderChatPage(<ChatPage />);

    expect(screen.getByTestId('chat-page-composer')).toContainElement(
      screen.getByTestId('input-field')
    );
    expect(screen.getByTestId('chat-page-composer')).toContainElement(
      screen.getByTestId('button')
    );
  });

  it('centers the input and send button row on the screen', () => {
    renderChatPage(<ChatPage />);

    expect(screen.getByTestId('chat-page-composer-inner')).toHaveStyle({
      marginLeft: 'auto',
      marginRight: 'auto',
    });
  });
  it('sets padding to 8px around message composer and button', () => {
    renderChatPage(<ChatPage />);

    expect(screen.getByTestId('chat-page-composer-inner')).toHaveStyle({
      padding: '8px',
      gap: '8px',
    });
  });
});
