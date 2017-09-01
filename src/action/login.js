import { Google, Facebook } from 'expo';

import firebase from 'lib/firebase';

import googleCredentials from 'credential/google.json';
import facebookCredentials from 'credential/facebook.json';

const google = async () => {
  const result = await Google.logInAsync({
    behavior: process.env.NODE_ENV === 'production' ? 'native' : 'web',
    androidClientId: googleCredentials.androidClientId,
    iosClientId: googleCredentials.iosClientId,
    androidStandaloneAppClientId:
      googleCredentials.androidStandaloneAppClientId,
    iosStandaloneAppClientId: googleCredentials.iosClientId,
    scopes: ['profile', 'email'],
  });

  const { type, idToken } = result;

  if (type === 'success') {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

    await firebase.auth().signInWithCredential(credential);
  } else {
    throw new Error();
  }
};

const facebook = async () => {
  const {
    type,
    token,
  } = await Facebook.logInWithReadPermissionsAsync(facebookCredentials.appId, {
    permissions: ['public_profile', 'email'],
  });

  if (type === 'success') {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    await firebase.auth().signInWithCredential(credential);
  } else {
    throw new Error();
  }
};

export { facebook, google };
