import { StackNavigator } from 'react-navigation';

import HomeScreen from 'Screen/HomeScreen';

const initialRouteName = 'Home';

const RootNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName,
  }
);

RootNavigator.initialRouteName = initialRouteName;

export default RootNavigator;
