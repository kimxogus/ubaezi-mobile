import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import connectDB from 'HOC/connectDB';
import { suggestion } from 'schema';
import { like, unlikeByTarget } from 'redux/action/like';

export default BaseComponent =>
  connectDB({
    schema: suggestion,
  })(
    connect(({ user }) => ({ user }), { like, unlikeByTarget })(
      withNavigation(BaseComponent)
    )
  );
