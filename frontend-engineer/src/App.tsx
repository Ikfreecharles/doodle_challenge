import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ChatPage } from './pages/ChatPage';
import {
  messagesSelectors,
  messagesActions,
} from './store/messages/messagesSlice';
import { AppDispatch } from './store/store';
import {
  activeUserActions,
  activeUserSelectors,
} from './store/activeUser/activeUserSlice';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(messagesSelectors.selectMessages);
  const isLoading = useSelector(messagesSelectors.selectMessagesLoading);
  const isSending = useSelector(messagesSelectors.selectMessageSending);
  const activeUser = useSelector(activeUserSelectors.selectActiveUser);
  const hasNoNewMessages = useSelector(
    messagesSelectors.selectHasNoNewMessages
  );

  useEffect(() => {
    dispatch(activeUserActions.fetchActiveUser());
    dispatch(messagesActions.fetchMessagesRequested());
  }, [dispatch]);

  return (
    <ChatPage
      messages={messages}
      isLoading={isLoading}
      isSending={isSending}
      hasNoNewMessages={hasNoNewMessages}
      activeUser={activeUser}
      onLoadNextMessages={() =>
        dispatch(messagesActions.fetchMessagesRequested())
      }
      onSendMessage={(message) =>
        dispatch(
          messagesActions.sendMessageRequested({
            author: activeUser,
            message,
          })
        )
      }
    />
  );
};
