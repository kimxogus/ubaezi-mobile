import { TabNavigator } from 'react-navigation';

import { theme } from 'styles/theme';

import FavoriteScreen from 'component/Screen/FavoriteScreen';
import StoreListScreen from 'component/Screen/StoreListScreen';
import SettingsScreen from 'component/Screen/SettingsScreen';

const initialRouteName = 'Favorite';

const AppNavigator = TabNavigator(
  {
    Favorite: {
      screen: FavoriteScreen,
    },
    StoreList: {
      screen: StoreListScreen,
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

AppNavigator.initialRouteName = initialRouteName;

export default AppNavigator;
