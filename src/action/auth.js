import { bindActionCreators } from 'redux';

import firebase from 'lib/firebase';
import store from 'redux/store';
import { setUser as setUserAC } from 'redux/action/user';

const emailRegExp = /@unist.ac.kr\s*$/;

export const createUser = async (email, password) => {
  if (!emailRegExp.test(email)) {
    throw new Error('@unist.ac.kr 이메일만 사용 가능합니다.');
  }
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email.trim(), password.trim());

  await firebase.auth().currentUser.sendEmailVerification();
};

export const login = async (email, password) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logout = async () => {
  await firebase.auth().signOut();
  bindActionCreators(setUserAC, store.dispatch)(null);
};
