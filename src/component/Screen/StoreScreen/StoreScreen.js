import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { sizes } from 'styles';

import StoreNavigator from 'component/Navigator/StoreNavigator';

StoreNavigator.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="list" size={sizes.icon} color={tintColor} />
  ),
};

export default StoreNavigator;
