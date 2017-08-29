import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from 'lib/firebase';

export default BaseComponent => {
  return class extends Component {
    static propTypes = {
      path: PropTypes.string.isRequired,
    };

    state = {
      loading: true,
      data: void 0,
    };

    async componentDidMount() {
      const { path } = this.props;
      const data = await firebase.database().ref(path).on('value');
      this.setState({
        loading: false,
        data,
      });
    }

    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  };
};
