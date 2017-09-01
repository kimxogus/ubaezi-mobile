import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { denormalize } from 'normalizr';

import firebase from 'lib/firebase';
import { setCache as setCacheAC } from 'redux/action/cache';
import progressive from 'HOC/progressive';

export default ({ schema, single = false } = {}) => BaseComponent => {
  const ProgressiveComponent = progressive(BaseComponent);
  class ConnectedComponent extends Component {
    static propTypes = {
      cacheFirst: PropTypes.bool,
      path: PropTypes.string.isRequired,
      referencePath: PropTypes.string,
      queryProcessor: PropTypes.func,
      defaultValue: PropTypes.any,
    };

    static defaultProps = {
      cacheFirst: false,
      referencePath: null,
      queryProcessor: null,
    };

    state = {
      loading: true,
      data: null,
    };

    async componentDidMount() {
      const {
        cache,
        path,
        queryProcessor,
        setCache,
        referencePath,
        cacheFirst,
        defaultValue,
      } = this.props;
      let query = firebase.database().ref(path);
      if (queryProcessor) {
        query = queryProcessor(query);
      }
      query.on('value', async snapshot => {
        const snapshotData = snapshot.val() || defaultValue;
        if (!snapshotData)
          return this.setState({
            loading: false,
          });
        if (referencePath) {
          await Promise.all(
            Object.keys(snapshotData).map(async id => {
              if (
                cacheFirst &&
                cache &&
                cache[schema.key] &&
                cache[schema.key][id]
              ) {
                snapshotData[id] = cache[schema.key][id];
              } else {
                snapshotData[id] = await new Promise(resolve =>
                  firebase
                    .database()
                    .ref(`${referencePath}/${id}`)
                    .once('value', s => resolve(s.val()))
                );
              }
            })
          );
        }
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

  return connect(({ cache }) => ({ cache }), { setCache: setCacheAC })(
    ConnectedComponent
  );
};
