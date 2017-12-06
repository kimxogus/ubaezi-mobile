import { all } from 'redux-saga/effects';

import favorite from './favorite';
import user from './user';
import suggestion from './suggestion';
import like from './like';

const rootSaga = function*() {
  yield all([user(), favorite(), suggestion(), like()]);
};

export default rootSaga;
