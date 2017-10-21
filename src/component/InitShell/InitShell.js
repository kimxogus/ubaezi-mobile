import React, { Component } from 'react';
import { Linking, Alert } from 'react-native';
import { AppLoading } from 'expo';
import VersionCheck from 'react-native-version-check-expo';

import progressive from 'HOC/progressive';

export default class InitShell extends Component {
  async componentDidMount() {
    // version check
    VersionCheck.needUpdate()
      .then(r => {
        const { isNeeded } = r;
        if (isNeeded) {
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
    return !this.props.initApp ? (
      <AppLoading />
    ) : (
      <Children {...this.props} {...this.state} />
    );
  }
}
