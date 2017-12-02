import { StackNavigator } from 'react-navigation';

import StoreListScreen from 'component/Screen/StoreScreen/StoreListScreen';
import StoreDetailScreen from 'component/Screen/StoreScreen/StoreDetailScreen';
import ModifySuggestionScreen from 'component/Screen/StoreScreen/ModifySuggestionScreen';

const initialRouteName = 'StoreList';

const StoreNavigator = StackNavigator(
  {
    StoreList: {
      screen: StoreListScreen,
    },
    StoreDetail: {
      screen: StoreDetailScreen,
    },
    ModifySuggestion: {
      screen: ModifySuggestionScreen,
    },
  },
  {
    initialRouteName,
    navigationOptions: {
      headerStyle: {
        height: 0,
      },
    },
  }
);

StoreNavigator.initialRouteName = initialRouteName;

export default StoreNavigator;
