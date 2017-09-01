import { connect } from 'react-redux';

const Container = BaseComponent =>
  connect(({ initApp }) => ({ initApp }))(BaseComponent);

export default Container;
