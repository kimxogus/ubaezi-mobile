import { all } from 'redux-saga/effects';

import favorite from './favorite';
import user from './user';
import suggestion from './suggestion';

const rootSaga = function*() {
  yield all([user(), favorite(), suggestion()]);
};

export default rootSaga;
