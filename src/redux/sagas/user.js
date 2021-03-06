import { call, put, take, fork, select } from 'redux-saga/effects';

import rsf from 'lib/sagaFirebase';

import { setUser } from 'redux/action/user';
import { setUserData, clearUserData } from 'redux/action/userData';
import { initApp as initAppAC } from 'redux/action/initApp';

const getInit = ({ initApp }) => initApp;

const getUser = ({ user }) => user;

const syncUser = function*() {
  const channel = yield call(rsf.auth.channel);
  while (true) {
    const init = yield select(getInit);
    const { user } = yield take(channel);

    if (user) {
      yield put(setUser(user));
      const userDataChannel = yield call(
        rsf.database.channel,
        `/users/${user.uid}`,
        'value'
      );
      while (true) {
        const { value: userData } = yield take(userDataChannel);
        yield put(setUserData(userData));
        const updatedUser = yield select(getUser);
        if (!init) {
          yield put(initAppAC());
        }
        if (!updatedUser) break;
      }
    } else {
      yield put(setUser(null));
      yield put(clearUserData());
      if (!init) {
        yield put(initAppAC());
      }
    }
  }
};

const userSaga = function*() {
  yield fork(syncUser);
};

export default userSaga;
