import { all, takeLatest } from 'redux-saga/effects';

import { addRepository } from './favorites';

export default function* rootSaga() {
  yield all([takeLatest('ADD_FAVORITE_REQUEST', addRepository)]);
}
