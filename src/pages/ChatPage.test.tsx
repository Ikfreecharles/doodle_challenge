import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatPage } from './ChatPage';
import { AppThemeProvider } from '../theme/AppThemeProvider';
import { ReactElement } from 'react';

const renderChatPage = (chatPage: ReactElement) => {
  return render(<AppThemeProvider>{chatPage}</AppThemeProvider>);
};

const messages = [
  {
    _id: '1',
    author: 'Ninja',
    message: 'Great resource, thanks',
    createdAt: '2026-07-07T18:26:02.625Z',
  },
  {
    _id: '2',
    author: 'I am mister brilliant',
    message: 'THANKSSSS!!!!!',
    createdAt: '2026-07-07T18:14:08.625Z',
  },
  {
    _id: '3',
    author: 'martin57',
    message: 'Thanks Peter',
    createdAt: '2026-07-07T18:28:22.625Z',
  },
  {
    _id: '4',
    author: 'Patricia',
    message: 'Sounds good to me!',
    createdAt: '2026-07-07T19:40:02.625Z',
  },
];

const manyMessages = Array.from({ length: 1000 }, (_, index) => ({
  _id: `${index}`,
  author: index % 2 === 0 ? 'Maddie' : 'Ninja',
  message: `Message ${index}`,
  createdAt: `2026-07-07T18:${String(index % 60).padStart(2, '0')}:02.625Z`,
}));

describe('ChatPage', () => {
  const onLoadNextMessages = jest.fn();
  const onSendMessage = jest.fn();
  const activeUser = 'Maddie';

  beforeEach(() => {
    onLoadNextMessages.mockReset();
    onSendMessage.mockReset();
  });

  it('renders the chat messages', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(screen.getByText('Great resource, thanks')).toBeInTheDocument();
    expect(screen.getByText('THANKSSSS!!!!!')).toBeInTheDocument();
    expect(screen.getByText('Thanks Peter')).toBeInTheDocument();
    expect(screen.getByText('Sounds good to me!')).toBeInTheDocument();
  });

  it('renders the message composer', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(
      screen.getByRole('textbox', { name: 'Message' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('formats message timestamps for the date caption', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(screen.getByText('07 July 2026 20:26')).toBeInTheDocument();
  });

  it('does not send a blank message', async () => {
    const user = userEvent.setup();

    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        activeUser={activeUser}
        onSendMessage={onSendMessage}
      />
    );

    await user.type(screen.getByRole('textbox', { name: 'Message' }), '   ');
    await user.keyboard('{Enter}');

    expect(onSendMessage).not.toHaveBeenCalled();
  });

  it('disables the send button while sending a message', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
        isSending
      />
    );

    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('renders the message thread as a virtualized list', () => {
    renderChatPage(
      <ChatPage
        messages={manyMessages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(screen.getByTestId('chat-page-thread')).toHaveAttribute(
      'role',
      'list'
    );
    expect(screen.getAllByTestId('chat-page-message-row').length).toBeLessThan(
      20
    );
  });

  it('requests the next page when the last message row is rendered', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(onLoadNextMessages).toHaveBeenCalledTimes(1);
  });
});

describe("ChatPage's layout", () => {
  const onLoadNextMessages = jest.fn();
  const onSendMessage = jest.fn();
  const activeUser = 'Maddie';

  beforeEach(() => {
    onLoadNextMessages.mockReset();
    onSendMessage.mockReset();
  });

  it('renders the chat interface with the body background image', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(screen.getByTestId('chat-page')).toHaveStyle({
      backgroundImage: 'url(/src/assets/Body BG.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: '768px 590px',
    });
  });

  it('renders a full width message scroll container', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(screen.getByTestId('chat-page-inner')).toHaveStyle({
      width: '100%',
      overflow: 'hidden',
    });
  });

  it('renders a full width virtualized message thread', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(screen.getByTestId('chat-page-thread')).toHaveStyle({
      width: '100%',
      height: '100%',
    });
  });

  it('centers message row content on the screen', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(screen.getAllByTestId('chat-page-message-row-inner')[0]).toHaveStyle(
      {
        maxWidth: '640px',
        margin: '0px auto',
      }
    );
  });

  it('renders a primary colored message composer bar', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(
      getComputedStyle(screen.getByTestId('chat-page-composer')).backgroundColor
    ).toBe('rgb(28, 143, 202)');
  });

  it('lays out the input and send button in the composer', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(screen.getByTestId('chat-page-composer')).toContainElement(
      screen.getByTestId('input-field')
    );
    expect(screen.getByTestId('chat-page-composer')).toContainElement(
      screen.getByTestId('button')
    );
  });

  it('centers the input and send button row on the screen', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(screen.getByTestId('chat-page-composer-inner')).toHaveStyle({
      marginLeft: 'auto',
      marginRight: 'auto',
    });
  });
  it('sets composer inner padding to 8px around message composer and button', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
      />
    );

    expect(screen.getByTestId('chat-page-composer-inner')).toHaveStyle({
      padding: '8px',
      gap: '8px',
    });
  });

  it('renders and centers a loading indicator while messages are being fetched ', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
        isLoading
      />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByTestId('chat-page-loader')).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it('renders the no new message text centered after the message list', () => {
    renderChatPage(
      <ChatPage
        messages={messages}
        onLoadNextMessages={onLoadNextMessages}
        onSendMessage={onSendMessage}
        activeUser={activeUser}
        hasNoNewMessages
      />
    );

    expect(screen.getByText('No new message')).toBeInTheDocument();
    expect(screen.getByTestId('chat-page-no-new-message')).toHaveStyle({
      textAlign: 'center',
    });
  });
});
