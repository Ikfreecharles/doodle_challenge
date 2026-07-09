import {
  messagesActions,
  messagesReducer,
  messagesSelectors,
  MessagesState,
} from './messagesSlice';
import { RootState } from '../store';

const messages = [
  {
    _id: '1',
    author: 'Ninja',
    message: 'Great resource, thanks',
    createdAt: '2018-03-10T09:55:00.000Z',
  },
];

const newMessage = {
  _id: '2',
  author: 'Maddie',
  message: 'Hello',
  createdAt: '2018-03-10T10:55:00.000Z',
};

describe('messagesSlice', () => {
  it('starts with the default state', () => {
    expect(messagesReducer(undefined, { type: '' })).toEqual({
      items: [],
      isLoading: false,
      isSending: false,
      error: null,
      hasNoNewMessages: false,
    });
  });

  it('marks isLoading as loading when fetching starts', () => {
    const state = messagesReducer(
      undefined,
      messagesActions.fetchMessagesRequested()
    );

    expect(state).toEqual({
      items: [],
      isLoading: true,
      isSending: false,
      error: null,
      hasNoNewMessages: false,
    });
  });

  it('marks messages as sending when sending starts', () => {
    const state = messagesReducer(
      undefined,
      messagesActions.sendMessageRequested({
        author: 'Maddie',
        message: 'Hello',
      })
    );

    expect(state).toEqual({
      items: [],
      isLoading: false,
      isSending: true,
      error: null,
      hasNoNewMessages: false,
    });
  });

  it('stores messages when fetching succeeds with an empty current state', () => {
    const previousState: MessagesState = {
      items: [],
      isLoading: true,
      isSending: false,
      error: null,
      hasNoNewMessages: false,
    };

    const state = messagesReducer(
      previousState,
      messagesActions.fetchMessagesSucceeded(messages)
    );

    expect(state).toEqual({
      items: messages,
      isLoading: false,
      isSending: false,
      error: null,
      hasNoNewMessages: false,
    });
  });

  it('appends messages when fetching succeeds with existing messages', () => {
    const previousState: MessagesState = {
      items: messages,
      isLoading: true,
      isSending: false,
      error: null,
      hasNoNewMessages: false,
    };
    const nextMessages = [
      {
        _id: '2',
        author: 'Patricia',
        message: 'Sounds good to me!',
        createdAt: '2018-03-10T10:55:00.000Z',
      },
    ];

    const state = messagesReducer(
      previousState,
      messagesActions.fetchMessagesSucceeded(nextMessages)
    );

    expect(state).toEqual({
      items: [...messages, ...nextMessages],
      isLoading: false,
      isSending: false,
      error: null,
      hasNoNewMessages: false,
    });
  });

  it('appends a sent message when sending succeeds', () => {
    const previousState: MessagesState = {
      items: messages,
      isLoading: false,
      isSending: true,
      error: null,
      hasNoNewMessages: true,
    };

    const state = messagesReducer(
      previousState,
      messagesActions.sendMessageSucceeded(newMessage)
    );

    expect(state).toEqual({
      items: [...messages, newMessage],
      isLoading: false,
      isSending: false,
      error: null,
      hasNoNewMessages: false,
    });
  });

  it('stores no new messages when the response is empty and mark hasNoNewMessage as true', () => {
    const previousState: MessagesState = {
      items: messages,
      isLoading: true,
      isSending: false,
      error: null,
      hasNoNewMessages: false,
    };

    const state = messagesReducer(
      previousState,
      messagesActions.fetchMessagesSucceeded([])
    );

    expect(state).toEqual({
      items: messages,
      isLoading: false,
      isSending: false,
      error: null,
      hasNoNewMessages: true,
    });
  });

  it('stores the error when fetching fails', () => {
    const previousState: MessagesState = {
      items: [],
      isLoading: true,
      isSending: false,
      error: null,
      hasNoNewMessages: false,
    };

    const state = messagesReducer(
      previousState,
      messagesActions.fetchMessagesFailed('Unable to fetch chat messages.')
    );

    expect(state).toEqual({
      items: [],
      isLoading: false,
      isSending: false,
      error: 'Unable to fetch chat messages.',
      hasNoNewMessages: false,
    });
  });

  it('stores the error when sending fails', () => {
    const previousState: MessagesState = {
      items: [],
      isLoading: false,
      isSending: true,
      error: null,
      hasNoNewMessages: false,
    };

    const state = messagesReducer(
      previousState,
      messagesActions.sendMessageFailed('Unable to send chat message.')
    );

    expect(state).toEqual({
      items: [],
      isLoading: false,
      isSending: false,
      error: 'Unable to send chat message.',
      hasNoNewMessages: false,
    });
  });

  it('selects messages state from the root state', () => {
    const rootState: RootState = {
      activeUser: {
        activeUser: 'Maddie',
      },
      messages: {
        items: messages,
        isLoading: false,
        isSending: false,
        error: null,
        hasNoNewMessages: true,
      },
    };

    expect(messagesSelectors.selectMessages(rootState)).toEqual(messages);
    expect(messagesSelectors.selectMessagesLoading(rootState)).toBe(false);
    expect(messagesSelectors.selectMessageSending(rootState)).toBe(false);
    expect(messagesSelectors.selectMessagesError(rootState)).toBeNull();
    expect(messagesSelectors.selectHasNoNewMessages(rootState)).toBe(true);
  });
});
