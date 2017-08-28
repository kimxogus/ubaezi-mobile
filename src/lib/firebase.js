import * as firebase from 'firebase';

import credential from 'credentials/firebase';

firebase.initializeApp(credential);

export default firebase;
