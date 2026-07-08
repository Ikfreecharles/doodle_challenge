import { all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

export function* rootSaga(): SagaIterator {
  yield all([]);
}

