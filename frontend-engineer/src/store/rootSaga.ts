import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { watchFetchMessages, watchSendMessage } from './messages/messagesSaga';

export function* rootSaga(): SagaIterator {
  yield all([fork(watchFetchMessages), fork(watchSendMessage)]);
}
