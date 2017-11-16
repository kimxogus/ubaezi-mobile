import { connect } from 'react-redux';

import connectDB from 'HOC/connectDB';
import { store } from 'schema';

export default BaseComponent =>
  connectDB({
    schema: store,
  })(
    connect(({ userData }) => ({
      favorites:
        userData && userData.favorites && userData.favorites.stores
          ? userData.favorites.stores
          : null,
    }))(BaseComponent)
  );
