// @flow
import { connect } from 'react-redux';

import connectDB from 'HOC/connectDB';
import { store } from 'schema';
import { addSuggestion } from 'redux/action/suggestion';

export default BaseComponent =>
  connectDB({
    schema: store,
  })(connect(() => ({}), { addSuggestion })(BaseComponent));
