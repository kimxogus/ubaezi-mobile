import { select, call, takeLatest } from 'redux-saga/effects';

// import rsf from 'lib/sagaFirebase';

import { ADD_FAVORITE, REMOVE_FAVORITE } from 'redux/action/type';

const getUser = ({ user }) => user;

const addFavorite = function*({ type, id }) {
  const { uid } = yield select(getUser); // <-- get the project
  const time = new Date().getTime();

  // yield call(rsf.database.update, {
  //   [`/users/${uid}/favorites/${type}/${id}`]: time,
  //   [`/${type}/${id}/favoriteUsers/${uid}`]: time,
  // });
};

const removeFavorite = function*({ type, id }) {
  const { uid } = yield select(getUser); // <-- get the project

  // yield call(rsf.database.update, {
  //   [`/users/${uid}/favorites/${type}/${id}`]: null,
  //   [`/${type}/${id}/favoriteUsers/${uid}`]: null,
  // });
};

const favoriteSaga = function*() {
  yield takeLatest(ADD_FAVORITE, addFavorite);
  yield takeLatest(REMOVE_FAVORITE, removeFavorite);
};

export default favoriteSaga;
