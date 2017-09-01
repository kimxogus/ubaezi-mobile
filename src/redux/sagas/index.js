import { all } from 'redux-saga/effects';

import favorite from './favorite';
import user from './user';

const rootSaga = function*() {
  yield all([user(), favorite()]);
};

export default rootSaga;
