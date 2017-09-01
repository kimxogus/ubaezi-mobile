import { connect } from 'react-redux';

import { addFavorite, removeFavorite } from 'redux/action/favorite';

export default BaseComponent =>
  connect(() => ({}), { addFavorite, removeFavorite })(BaseComponent);
