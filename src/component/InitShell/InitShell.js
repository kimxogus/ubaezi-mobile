import { Component, Children } from 'react';
import { Linking, Alert } from 'react-native';
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
          Alert.alert('업데이트 안내', '유배지 업데이트가 출시되었습니다.\n업데이트하러 가시겠습니까?', [
            {
              text: '아니요!',
            },
            {
              text: '네!',
              onPress: async () => {
                const url = await VersionCheck.getStoreUrlAsync();
                const canOpen = await Linking.canOpenURL(url);
                if (canOpen) {
                  Linking.openURL(url);
                }
              },
            },
          ]);
        }
      })
      .catch(() => {});
  }

  render() {
    const { children } = this.props;
    return (children && Children.only(children)) || null;
  }
}
