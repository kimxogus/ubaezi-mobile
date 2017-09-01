import { select, call, takeLatest } from 'redux-saga/effects';

import rsf from 'lib/sagaFirebase';

import { ADD_FAVORITE, REMOVE_FAVORITE } from 'redux/action/type';

const getUser = ({ user }) => user;

const addFavorite = function*({ key, id }) {
  const { uid } = yield select(getUser);
  const time = new Date().getTime();

  yield call(rsf.database.update, `/users/${uid}/favorites/${key}/${id}`, time);
  yield call(rsf.database.update, `/${key}/${id}/favoriteUsers/${uid}`, time);
};

const removeFavorite = function*({ key, id }) {
  const { uid } = yield select(getUser);

  yield call(rsf.database.update, `/users/${uid}/favorites/${key}/${id}`, null);
  yield call(rsf.database.update, `/${key}/${id}/favoriteUsers/${uid}`, null);
};

const favoriteSaga = function*() {
  yield takeLatest(ADD_FAVORITE, addFavorite);
  yield takeLatest(REMOVE_FAVORITE, removeFavorite);
};

export default favoriteSaga;
