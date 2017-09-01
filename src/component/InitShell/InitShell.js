import React, { Component } from 'react';
import { Linking, Alert } from 'react-native';
import VersionCheck from 'react-native-version-check/expo';

import firebase from 'lib/firebase';
import progressive from 'HOC/progressive';

export default class InitShell extends Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    // firebase
    firebase.auth().onAuthStateChanged(user => {
      const { init, initApp, setUser, setUserData, clearUserData } = this.props;
      setUser(user);
      clearUserData();
      if (user && user.uid) {
        this.setState({ loading: true });
        firebase
          .database()
          .ref(`/users/${user.uid}`)
          .once('value', snapshot => {
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            }
            this.setState({ loading: false });
          });
      }
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
    const Children = progressive(this.props.children);
    return <Children {...this.props} {...this.state} />;
  }
}
