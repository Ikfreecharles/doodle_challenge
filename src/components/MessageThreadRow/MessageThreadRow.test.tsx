import { render, screen } from '@testing-library/react';
import { CSSProperties } from 'react';
import { AppThemeProvider } from '../../theme/AppThemeProvider';
import { IMessage } from '../../types/types';
import { MessageThreadRow, MessageThreadRowProps } from './MessageThreadRow';

const messages: IMessage[] = [
  {
    _id: '1',
    author: 'Maddie',
    message: 'I will join the planning session.',
    createdAt: '2026-07-07T18:26:02.625Z',
  },
  {
    _id: '2',
    author: 'Ninja',
    message: 'Great resource, thanks',
    createdAt: '2026-07-07T18:28:02.625Z',
  },
];

const renderMessageThreadRow = (
  props: Partial<MessageThreadRowProps> & {
    index?: number;
    style?: CSSProperties;
  }
) => {
  return render(
    <AppThemeProvider>
      <MessageThreadRow
        activeUser={props.activeUser ?? 'Maddie'}
        ariaAttributes={{
          'aria-posinset': (props.index ?? 0) + 1,
          'aria-setsize': messages.length,
          role: 'listitem',
        }}
        hasNoNewMessages={props.hasNoNewMessages ?? false}
        index={props.index ?? 0}
        isLoading={props.isLoading ?? false}
        messages={props.messages ?? messages}
        style={props.style ?? { height: 96, width: '100%' }}
      />
    </AppThemeProvider>
  );
};

describe('MessageThreadRow', () => {
  it('renders the loading row', () => {
    renderMessageThreadRow({
      index: messages.length,
      isLoading: true,
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByTestId('chat-page-loader')).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it('renders the no new message row', () => {
    renderMessageThreadRow({
      hasNoNewMessages: true,
      index: messages.length,
    });

    expect(screen.getByText('No new message')).toBeInTheDocument();
    expect(screen.getByTestId('chat-page-no-new-message')).toHaveStyle({
      textAlign: 'center',
    });
  });
});
