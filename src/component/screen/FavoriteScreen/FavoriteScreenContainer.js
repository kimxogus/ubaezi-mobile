import { connect } from 'react-redux';

export default BaseComponent =>
  connect(({ user }) => ({ user }))(BaseComponent);
