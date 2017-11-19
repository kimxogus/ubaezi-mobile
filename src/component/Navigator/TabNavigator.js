// @flow
import { TabNavigator } from 'react-navigation';

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
