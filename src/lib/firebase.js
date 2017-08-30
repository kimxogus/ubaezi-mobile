import * as firebase from 'firebase';

import credential from 'credential/firebase.json';

firebase.initializeApp(credential);

export default firebase;
