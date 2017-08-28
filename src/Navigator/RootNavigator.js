import { StackNavigator } from 'react-navigation';

import HomeScreen from 'Screen/HomeScreen';

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
