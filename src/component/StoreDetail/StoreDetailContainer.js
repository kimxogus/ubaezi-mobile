// @flow
import { withNavigation } from 'react-navigation';

import connectDB from 'HOC/connectDB';
import { store } from 'schema';

export default BaseComponent =>
  connectDB({
    schema: store,
  })(withNavigation(BaseComponent));
