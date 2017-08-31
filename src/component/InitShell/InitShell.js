import { Component, Children } from 'react';
import VersionCheck from 'react-native-version-check/expo';

import firebase from 'lib/firebase';

export default class InitShell extends Component {
  async componentDidMount() {
    // firebase
    firebase.auth().onAuthStateChanged(user => {
      const { init, initApp, setUser } = this.props;
      setUser(user);
      if (!init) initApp();
    });

    // version check
    VersionCheck.needUpdate({ depth: 2 })
      .then(r => {
        if (r.isNeeded) {
          // update needed!
        }
      })
      .catch(() => {});
  }

  render() {
    const { children } = this.props;
    return (children && Children.only(children)) || null;
  }
}
