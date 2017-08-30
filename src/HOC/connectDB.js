import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from 'lib/firebase';

export default ({ schema } = {}) => BaseComponent => {
  return class extends Component {
    static propTypes = {
      path: PropTypes.string.isRequired,
      queryProcessor: PropTypes.func,
    };

    static defaultProps = {
      queryProcessor: null,
    };

    state = {
      loading: true,
      data: void 0,
    };

    async componentDidMount() {
      const { path, queryProcessor } = this.props;
      let query = firebase.database().ref(path);
      if (queryProcessor) {
        query = queryProcessor(query);
      }
      query.on('value', snapshot => {
        const data = snapshot;
        this.setState({
          loading: false,
          data,
        });
      });
    }

    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  };
};
