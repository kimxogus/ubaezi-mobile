import ReduxSagaFirebase from 'redux-saga-firebase';

import firebase from 'lib/firebase';

export default new ReduxSagaFirebase(firebase);
