import {
  call,
  cancelled,
  put,
  select,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';

import { fetchMessages, sendMessage } from '../../api/messagesApi';
import { messagesActions, messagesSelectors } from './messagesSlice';
import {
  fetchMessagesSaga,
  sendMessageSaga,
  watchFetchMessages,
  watchSendMessage,
} from './messagesSaga';

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

const sendMessagePayload = {
  author: 'Maddie',
  message: 'Hello',
};

describe('messagesSaga', () => {
  let abortController: AbortController;
  let abortControllerSpy: jest.SpyInstance<AbortController, []>;

  beforeEach(() => {
    abortController = new AbortController();
    abortControllerSpy = jest
      .spyOn(global, 'AbortController')
      .mockImplementation(() => abortController);
  });

  afterEach(() => {
    abortControllerSpy.mockRestore();
  });

  it('fetches messages with pagination and dispatches success', () => {
    const generator = fetchMessagesSaga();

    expect(generator.next().value).toEqual(
      select(messagesSelectors.selectMessages)
    );
    expect(generator.next([]).value).toEqual(
      call(fetchMessages, { limit: 10 }, abortController.signal)
    );
    expect(generator.next(messages).value).toEqual(
      put(messagesActions.fetchMessagesSucceeded(messages))
    );
    expect(generator.next().value).toEqual(cancelled());
    expect(generator.next(false).done).toBe(true);
  });

  it('fetches the next page after the last message timestamp', () => {
    const generator = fetchMessagesSaga();

    expect(generator.next().value).toEqual(
      select(messagesSelectors.selectMessages)
    );
    expect(generator.next(messages).value).toEqual(
      call(
        fetchMessages,
        {
          after: '2018-03-10T09:55:00.000Z',
          limit: 10,
        },
        abortController.signal
      )
    );
    expect(generator.next(messages).value).toEqual(
      put(messagesActions.fetchMessagesSucceeded(messages))
    );
    expect(generator.next().value).toEqual(cancelled());
    expect(generator.next(false).done).toBe(true);
  });

  it('dispatches failure when fetching messages fails', () => {
    const generator = fetchMessagesSaga();

    expect(generator.next().value).toEqual(
      select(messagesSelectors.selectMessages)
    );
    expect(generator.next([]).value).toEqual(
      call(fetchMessages, { limit: 10 }, abortController.signal)
    );
    expect(
      generator.throw(new Error('Unable to fetch chat messages.')).value
    ).toEqual(
      put(messagesActions.fetchMessagesFailed('Unable to fetch chat messages.'))
    );
    expect(generator.next().value).toEqual(cancelled());
    expect(generator.next(false).done).toBe(true);
  });

  it('fetches without an after timestamp when there is no last message', () => {
    const generator = fetchMessagesSaga();

    expect(generator.next().value).toEqual(
      select(messagesSelectors.selectMessages)
    );
    expect(generator.next([]).value).toEqual(
      call(fetchMessages, { limit: 10 }, abortController.signal)
    );
    expect(generator.next(messages).value).toEqual(
      put(messagesActions.fetchMessagesSucceeded(messages))
    );
    expect(generator.next().value).toEqual(cancelled());
    expect(generator.next(false).done).toBe(true);
  });

  it('aborts the request when the saga is cancelled', () => {
    const generator = fetchMessagesSaga();
    const abortSpy = jest.spyOn(abortController, 'abort');

    generator.next();
    generator.next([]);
    expect(generator.return(undefined).value).toEqual(cancelled());
    expect(generator.next(true).done).toBe(true);
    expect(abortSpy).toHaveBeenCalledTimes(1);
  });

  it('watches for fetch message requests', () => {
    const generator = watchFetchMessages();

    expect(generator.next().value).toEqual(
      takeLatest(messagesActions.fetchMessagesRequested.type, fetchMessagesSaga)
    );
    expect(generator.next().done).toBe(true);
  });
});

describe('sendMessageSaga', () => {
  it('sends a message and dispatches success', () => {
    const generator = sendMessageSaga(
      messagesActions.sendMessageRequested(sendMessagePayload)
    );

    expect(generator.next().value).toEqual(
      call(sendMessage, sendMessagePayload)
    );
    expect(generator.next(newMessage).value).toEqual(
      put(messagesActions.sendMessageSucceeded(newMessage))
    );
    expect(generator.next().done).toBe(true);
  });

  it('dispatches failure when sending a message fails', () => {
    const generator = sendMessageSaga(
      messagesActions.sendMessageRequested(sendMessagePayload)
    );

    expect(generator.next().value).toEqual(
      call(sendMessage, sendMessagePayload)
    );
    expect(
      generator.throw(new Error('Unable to send chat message.')).value
    ).toEqual(
      put(messagesActions.sendMessageFailed('Unable to send chat message.'))
    );
    expect(generator.next().done).toBe(true);
  });

  it('watches for send message requests', () => {
    const generator = watchSendMessage();

    expect(generator.next().value).toEqual(
      takeLeading(messagesActions.sendMessageRequested.type, sendMessageSaga)
    );
    expect(generator.next().done).toBe(true);
  });
});
