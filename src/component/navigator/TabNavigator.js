import React from 'react';
import { TabNavigator, TabBarTop, NavigationActions } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import { sizes } from 'styles';
import { theme } from 'styles/theme';

import FavoriteScreen from 'component/Screen/FavoriteScreen';
import StoreScreen from 'component/Screen/StoreScreen';
import SettingsScreen from 'component/Screen/SettingsScreen';

const initialRouteName = 'Favorite';

const Navigator = TabNavigator(
  {
    Favorite: {
      screen: FavoriteScreen,
    },
    Store: {
      screen: StoreScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    initialRouteName,
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true,
    // tabBarComponent: ({ jumpToIndex, ...props }) => (
    //   <TabBarTop
    //     {...props}
    //     jumpToIndex={index => {
    //       console.log('tab nav', props.navigation.state);
    //       // if (index === 1) {
    //       //   props.navigation.dispatch(
    //       //     NavigationActions.navigate({
    //       //       routeName: 'Store',
    //       //       action: NavigationActions.navigate({
    //       //         routeName: 'StoreList',
    //       //         params: {},
    //       //       }),
    //       //     })
    //       //   );
    //       // } else {
    //       jumpToIndex(index);
    //       // }
    //     }}
    //   />
    // ),
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeBackgroundColor: theme.bg,
      activeTintColor: theme.fg,
      style: {
        backgroundColor: theme.bg,
      },
      indicatorStyle: {
        backgroundColor: theme.fg,
      },
    },
  }
);

Navigator.initialRouteName = initialRouteName;

export default Navigator;
