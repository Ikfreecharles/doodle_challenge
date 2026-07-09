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

describe('ChatPage', () => {
  it('renders the chat messages', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(screen.getByText('Great resource, thanks')).toBeInTheDocument();
    expect(screen.getByText('THANKSSSS!!!!!')).toBeInTheDocument();
    expect(screen.getByText('Thanks Peter')).toBeInTheDocument();
    expect(screen.getByText('Sounds good to me!')).toBeInTheDocument();
  });

  it('renders the message composer', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(
      screen.getByRole('textbox', { name: 'Message' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('formats message timestamps for the date caption', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(screen.getByText('07 July 2026 20:26')).toBeInTheDocument();
  });

  it('does not send a blank message', async () => {
    const user = userEvent.setup();
    const onSendMessage = jest.fn();

    renderChatPage(
      <ChatPage messages={messages} onSendMessage={onSendMessage} />
    );

    await user.type(screen.getByRole('textbox', { name: 'Message' }), '   ');
    await user.keyboard('{Enter}');

    expect(onSendMessage).not.toHaveBeenCalled();
  });

  it('disables the send button while sending a message', () => {
    renderChatPage(<ChatPage messages={messages} isSending />);

    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('requests the next page when the last message comes into frame', () => {
    const onLoadNextMessages = jest.fn();
    const originalIntersectionObserver = global.IntersectionObserver;
    let intersectionCallback: IntersectionObserverCallback = () => undefined;

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = '';
      readonly scrollMargin = '';
      readonly thresholds = [];
      disconnect = jest.fn();
      observe = jest.fn();
      takeRecords = jest.fn(() => []);
      unobserve = jest.fn();

      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }
    }

    global.IntersectionObserver = MockIntersectionObserver;

    renderChatPage(
      <ChatPage messages={messages} onLoadNextMessages={onLoadNextMessages} />
    );

    const intersectionObserverEntry: IntersectionObserverEntry = {
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 1,
      intersectionRect: {} as DOMRectReadOnly,
      isIntersecting: true,
      rootBounds: null,
      target: screen.getByTestId('chat-page-bottom-sentinel'),
      time: 0,
    };

    intersectionCallback(
      [intersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(onLoadNextMessages).toHaveBeenCalledTimes(1);

    global.IntersectionObserver = originalIntersectionObserver;
  });
});

describe("ChatPage's layout", () => {
  it('renders the chat interface with the body background image', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(screen.getByTestId('chat-page')).toHaveStyle({
      backgroundImage: 'url(/src/assets/Body BG.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: '768px 590px',
    });
  });

  it('renders a full width message scroll container', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(screen.getByTestId('chat-page-inner')).toHaveStyle({
      width: '100%',
      overflowY: 'auto',
    });
  });

  it('renders a message thread with a max width of 640px', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(screen.getByTestId('chat-page-thread')).toHaveStyle({
      maxWidth: '640px',
    });
  });

  it('centers the message thread on the screen', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(screen.getByTestId('chat-page-thread')).toHaveStyle({
      margin: '0px auto',
    });
  });

  it('renders a primary colored message composer bar', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(
      getComputedStyle(screen.getByTestId('chat-page-composer')).backgroundColor
    ).toBe('rgb(28, 143, 202)');
  });

  it('lays out the input and send button in the composer', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(screen.getByTestId('chat-page-composer')).toContainElement(
      screen.getByTestId('input-field')
    );
    expect(screen.getByTestId('chat-page-composer')).toContainElement(
      screen.getByTestId('button')
    );
  });

  it('centers the input and send button row on the screen', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(screen.getByTestId('chat-page-composer-inner')).toHaveStyle({
      marginLeft: 'auto',
      marginRight: 'auto',
    });
  });
  it('sets padding to 8px around message composer and button', () => {
    renderChatPage(<ChatPage messages={messages} />);

    expect(screen.getByTestId('chat-page-composer-inner')).toHaveStyle({
      padding: '8px',
      gap: '8px',
    });
  });

  it('renders and centers a loading indicator while messages are being fetched ', () => {
    renderChatPage(<ChatPage messages={messages} isLoading />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByTestId('chat-page-loader')).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it('renders the no new message text centered after the message list', () => {
    renderChatPage(<ChatPage messages={messages} hasNoNewMessages />);

    expect(screen.getByText('No new message')).toBeInTheDocument();
    expect(screen.getByTestId('chat-page-no-new-message')).toHaveStyle({
      textAlign: 'center',
    });
  });
});
