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
      } = this.props;
      let query = firebase.database().ref(path);
      if (queryProcessor) {
        query = queryProcessor(query);
      }
      query.on('value', async snapshot => {
        if (!snapshot.exists())
          return this.setState({
            loading: false,
          });
        let snapshotData = snapshot.val();
        if (referencePath) {
          snapshotData = await Object.keys(
            snapshotData
          ).reduce(async (a, b) => {
            if (
              cacheFirst &&
              cache &&
              cache[schema.key] &&
              cache[schema.key][b]
            ) {
              a[b] = cache[schema.key][b];
            }
            if (!a[b]) {
              a[b] = await new Promise(resolve =>
                firebase
                  .database()
                  .ref(`${referencePath}/${b}`)
                  .once('value', s => resolve(s.val()))
              );
            }
            return a;
          }, {});
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
