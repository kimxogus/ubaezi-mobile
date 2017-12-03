//@flow
import { withNavigation } from 'react-navigation';

import connectDB from 'HOC/connectDB';
import { suggestion } from 'schema';

export default BaseComponent =>
  connectDB({
    schema: suggestion,
  })(withNavigation(BaseComponent));
