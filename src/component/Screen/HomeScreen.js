import { Constants } from 'expo';

import TabNavigator from 'component/Navigator/TabNavigator';

TabNavigator.navigationOptions = {
  headerStyle: {
    height: 0,
    marginTop: Constants.statusBarHeight,
  },
};

export default TabNavigator;
