import { call, put, take, fork, select } from 'redux-saga/effects';

import rsf from 'lib/sagaFirebase';

import { setUser, setUserData, clearUserData } from 'redux/action/user';
import { initApp as initAppAC } from 'redux/action/initApp';

const getInit = ({ initApp }) => initApp;

const syncUser = function*() {
  const channel = yield call(rsf.auth.channel);
  while (true) {
    const init = yield select(getInit);
    const { user } = yield take(channel);

    if (user) {
      yield put(setUser(user));
      const userData = yield call(rsf.database.read, `/users/${user.uid}`);
      yield put(setUserData(userData));
    } else {
      yield put(setUser(null));
      yield put(clearUserData());
    }

    if (!init) {
      yield put(initAppAC());
    }
  }
};

const userSaga = function*() {
  yield fork(syncUser);
};

export default userSaga;
