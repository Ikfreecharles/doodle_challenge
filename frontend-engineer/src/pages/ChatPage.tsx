import { Box, CircularProgress, Typography } from '@mui/material';
import { MessageBox } from '../components/MessageBox';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import {
  ChatPageComposerInnerSx,
  ChatPageComposerSx,
  ChatPageInnerSx,
  ChatPageLoaderSx,
  ChatPageRootSx,
  ChatPageThreadSx,
} from './ChatPage.styles';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IMessage } from '../types/types';
import { formatMessageDate } from '../utils/dateFormat';

export type ChatPageProps = {
  messages: IMessage[];
  onLoadNextMessages?: () => void;
  onSendMessage?: (message: string) => void;
  activeUser?: string;
  isLoading?: boolean;
  isSending?: boolean;
  hasNoNewMessages?: boolean;
};

export const ChatPage = ({
  messages,
  isLoading = false,
  isSending = false,
  hasNoNewMessages = false,
  onLoadNextMessages = () => undefined,
  onSendMessage = () => undefined,
  activeUser = 'Maddie',
}: ChatPageProps) => {
  const [messageValue, setMessageValue] = useState('');
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bottomSentinel = bottomSentinelRef.current;

    if (
      !bottomSentinel ||
      isLoading ||
      hasNoNewMessages ||
      messages.length === 0 ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry?.isIntersecting) {
        onLoadNextMessages();
      }
    });

    observer.observe(bottomSentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasNoNewMessages, isLoading, messages.length, onLoadNextMessages]);

  const handleMessageChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    e.preventDefault();
    setMessageValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageValue.trim() === '' && !isSending) {
      return;
    }
    onSendMessage(messageValue);
    setMessageValue('');
  };

  const handleMessageKeyDown: KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box component="main" data-testid="chat-page" sx={ChatPageRootSx}>
      <Box data-testid="chat-page-inner" sx={ChatPageInnerSx}>
        <Box data-testid="chat-page-thread" sx={ChatPageThreadSx}>
          {messages.map((message) => (
            <MessageBox
              key={`${message.author}-${message.createdAt}`}
              author={message.author}
              message={message.message}
              sentByActiveUser={message.author === activeUser}
              createdAt={formatMessageDate(message.createdAt)}
            />
          ))}
          {isLoading ? (
            <Box data-testid="chat-page-loader" sx={ChatPageLoaderSx}>
              <CircularProgress size={24} />
            </Box>
          ) : null}
          {hasNoNewMessages ? (
            <Typography
              data-testid="chat-page-no-new-message"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
              }}
              variant="caption"
            >
              No new message
            </Typography>
          ) : null}
          <Box
            aria-hidden="true"
            data-testid="chat-page-bottom-sentinel"
            ref={bottomSentinelRef}
          />
        </Box>
      </Box>

      <Box data-testid="chat-page-composer" sx={ChatPageComposerSx}>
        <Box
          data-testid="chat-page-composer-inner"
          sx={ChatPageComposerInnerSx}
        >
          <InputField
            value={messageValue}
            onChange={handleMessageChange}
            onKeyDown={handleMessageKeyDown}
          />
          <Button
            onClick={handleSendMessage}
            disabled={messageValue.trim() === '' || isSending}
          />
        </Box>
      </Box>
    </Box>
  );
};
