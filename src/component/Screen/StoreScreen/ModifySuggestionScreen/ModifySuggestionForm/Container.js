// @flow
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import connectDB from 'HOC/connectDB';
import { store } from 'schema';
import { addSuggestion } from 'redux/action/suggestion';

export default BaseComponent =>
  connectDB({
    schema: store,
  })(withNavigation(connect(() => ({}), { addSuggestion })(BaseComponent)));
