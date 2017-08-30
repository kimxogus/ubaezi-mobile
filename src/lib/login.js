import { Google, Facebook } from 'expo';

import firebase from 'lib/firebase';

import googleCredentials from 'credential/google';
import facebookCredentials from 'credential/facebook';

const google = async () => {
  try {
    const { type, accessToken } = await Google.logInAsync({
      ...googleCredentials,
      scopes: ['profile', 'email'],
    });

    if (type === 'success') {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        accessToken
      );

      await firebase.auth().signInWithCredential(credential);
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error('Login Failed');
  }
};

const facebook = async () => {
  try {
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync(
      facebookCredentials.appId,
      {
        permissions: ['public_profile', 'email'],
      }
    );

    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      await firebase.auth().signInWithCredential(credential);
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error('Login Failed');
  }
};

export { facebook, google };
