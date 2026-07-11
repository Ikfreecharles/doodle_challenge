import { Box } from '@mui/material';
import { List, ListImperativeAPI, useDynamicRowHeight } from 'react-window';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import {
  ChatPageComposerInnerSx,
  ChatPageComposerSx,
  ChatPageInnerSx,
  ChatPageRootSx,
} from './ChatPage.styles';
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChatPageProps, defaultMessageRowHeight } from '../types/types';
import { MessageThreadRow } from '../components/MessageThreadRow';

export const ChatPage = ({
  messages,
  onLoadNextMessages,
  onSendMessage,
  activeUser,
  isLoading = false,
  isSending = false,
  hasNoNewMessages = false,
}: ChatPageProps) => {
  const [messageValue, setMessageValue] = useState('');
  const listRef = useRef<ListImperativeAPI | null>(null);
  const rowHeight = useDynamicRowHeight({
    defaultRowHeight: defaultMessageRowHeight,
    key: messages.length,
  });
  const previousMessagesLengthRef = useRef(messages.length);
  const requestedNextMessagesForLengthRef = useRef<number | null>(null);
  const shouldScrollToSentMessageRef = useRef(false);

  useEffect(() => {
    const previousMessagesLength = previousMessagesLengthRef.current;
    const hasAppendedMessage = messages.length > previousMessagesLength;

    if (shouldScrollToSentMessageRef.current && hasAppendedMessage) {
      const list = listRef.current;

      requestedNextMessagesForLengthRef.current = messages.length;
      list?.scrollToRow({
        align: 'end',
        behavior: 'instant',
        index: messages.length - 1,
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const listElement = list?.element;

          listElement?.scrollTo({
            behavior: 'instant',
            top: listElement.scrollHeight,
          });
        });
      });
      shouldScrollToSentMessageRef.current = false;
    }

    if (shouldScrollToSentMessageRef.current && !isSending) {
      shouldScrollToSentMessageRef.current = false;
    }

    previousMessagesLengthRef.current = messages.length;
  }, [isSending, listRef, messages.length]);

  const rowCount =
    messages.length + (isLoading ? 1 : 0) + (hasNoNewMessages ? 1 : 0);
  const rowProps = useMemo(
    () => ({
      activeUser,
      hasNoNewMessages,
      isLoading,
      messages,
    }),
    [activeUser, hasNoNewMessages, isLoading, messages]
  );
  const handleRowsRendered = useCallback(
    ({ stopIndex }: { startIndex: number; stopIndex: number }) => {
      const lastMessageIndex = messages.length - 1;

      if (
        lastMessageIndex < 0 ||
        stopIndex < lastMessageIndex ||
        isLoading ||
        hasNoNewMessages ||
        shouldScrollToSentMessageRef.current ||
        requestedNextMessagesForLengthRef.current === messages.length
      ) {
        return;
      }

      requestedNextMessagesForLengthRef.current = messages.length;
      onLoadNextMessages();
    },
    [hasNoNewMessages, isLoading, messages.length, onLoadNextMessages]
  );

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    event.preventDefault();
    setMessageValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageValue.trim() === '' || isSending) {
      return;
    }
    shouldScrollToSentMessageRef.current = true;
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
        <List
          data-testid="chat-page-thread"
          defaultHeight={600}
          listRef={listRef}
          onRowsRendered={handleRowsRendered}
          overscanCount={3}
          rowComponent={MessageThreadRow}
          rowCount={rowCount}
          rowHeight={rowHeight}
          rowProps={rowProps}
          style={{ height: '100%', width: '100%' }}
        />
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
