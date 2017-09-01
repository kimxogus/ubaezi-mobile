import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { denormalize } from 'normalizr';

import firebase from 'lib/firebase';
import { setCache as setCacheAC } from 'redux/action/cache';
import progressive from 'HOC/progressive';

export default ({ schema, single = false } = {}) => BaseComponent => {
  const ProgressiveComponent = progressive(BaseComponent);
  class ConnectedComponent extends Component {
    static propTypes = {
      path: PropTypes.string.isRequired,
      queryProcessor: PropTypes.func,
    };

    static defaultProps = {
      queryProcessor: null,
    };

    state = {
      loading: true,
      data: null,
    };

    async componentDidMount() {
      const { path, queryProcessor, setCache } = this.props;
      let query = firebase.database().ref(path);
      if (queryProcessor) {
        query = queryProcessor(query);
      }
      query.on('value', snapshot => {
        if (!snapshot.exists())
          return this.setState({
            loading: false,
          });
        const snapshotData = snapshot.val();
        const entities = {
          [schema.key]: snapshotData,
        };
        const data = denormalize(
          Object.keys(snapshotData),
          single ? schema : [schema],
          entities
        );
        setCache(entities);
        this.setState({
          loading: false,
          data,
        });
      });
    }

    render() {
      return <ProgressiveComponent {...this.props} {...this.state} />;
    }
  }

  return connect(
    () => ({}),
    dispatch => ({
      setCache: bindActionCreators(setCacheAC, dispatch),
    })
  )(ConnectedComponent);
};
