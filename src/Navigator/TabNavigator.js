import { TabNavigator } from 'react-navigation';

import FavoriteScreen from 'screen/FavoriteScreen';
import StoreListScreen from 'screen/StoreListScreen';
import SettingsScreen from 'screen/SettingsScreen';

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
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
    },
  }
);

AppNavigator.initialRouteName = initialRouteName;

export default AppNavigator;
