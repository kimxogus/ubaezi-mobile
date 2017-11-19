// @flow
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';

import HomeScreen from 'component/Screen/HomeScreen';

const initialRouteName = 'Home';

const AppNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName,
    navigationOptions: {
      headerStyle: {
        height: 0,
        marginTop: Constants.statusBarHeight,
      },
    },
  }
);

AppNavigator.initialRouteName = initialRouteName;

export default AppNavigator;
