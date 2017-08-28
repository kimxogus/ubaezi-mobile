import { TabNavigator } from 'react-navigation';

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
