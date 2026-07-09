import { SagaIterator } from 'redux-saga';
import {
  call,
  cancelled,
  put,
  select,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';
import { fetchMessages, sendMessage } from '../../api/messagesApi';
import { IMessage } from '../../types/types';
import { messagesActions, messagesSelectors } from './messagesSlice';

export function* fetchMessagesSaga(): SagaIterator {
  const abortController = new AbortController();

  try {
    const currentMessages: IMessage[] = yield select(
      messagesSelectors.selectMessages
    );
    const lastMessage = currentMessages[currentMessages.length - 1];

    const messages: IMessage[] = lastMessage
      ? yield call(
          fetchMessages,
          {
            after: lastMessage.createdAt,
            limit: 10,
          },
          abortController.signal
        )
      : yield call(fetchMessages, { limit: 10 }, abortController.signal);

    yield put(messagesActions.fetchMessagesSucceeded(messages));
  } catch (error) {
    yield put(
      messagesActions.fetchMessagesFailed(
        error instanceof Error
          ? error.message
          : 'Unable to fetch chat messages.'
      )
    );
  } finally {
    if (yield cancelled()) {
      abortController.abort();
    }
  }
}

export function* watchFetchMessages(): SagaIterator {
  yield takeLatest(
    messagesActions.fetchMessagesRequested.type,
    fetchMessagesSaga
  );
}

export function* sendMessageSaga(
  action: ReturnType<typeof messagesActions.sendMessageRequested>
): SagaIterator {
  try {
    const message: IMessage = yield call(sendMessage, action.payload);

    yield put(messagesActions.sendMessageSucceeded(message));
  } catch (error) {
    yield put(
      messagesActions.sendMessageFailed(
        error instanceof Error ? error.message : 'Unable to send chat message.'
      )
    );
  }
}

export function* watchSendMessage(): SagaIterator {
  yield takeLeading(messagesActions.sendMessageRequested.type, sendMessageSaga);
}
