import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { denormalize } from 'normalizr';

import firebase from 'lib/firebase';
import { setCache as setCacheAC } from 'redux/action/cache';
import progressive from 'HOC/progressive';

export default ({ schema } = {}) => BaseComponent => {
  const ProgressiveComponent = progressive(BaseComponent);
  class ConnectedComponent extends Component {
    static propTypes = {
      cache: PropTypes.object,
      setCache: PropTypes.func,
      cacheFirst: PropTypes.bool,
      path: PropTypes.string.isRequired,
      id: PropTypes.string,
      referencePath: PropTypes.string,
      queryProcessor: PropTypes.func,
      defaultValue: PropTypes.any,
    };

    static defaultProps = {
      id: null,
      cacheFirst: false,
      referencePath: null,
      queryProcessor: null,
    };

    state = {
      loading: true,
      data: null,
    };

    load = () => {
      const {
        cache,
        path: p,
        id,
        queryProcessor,
        setCache,
        referencePath,
        cacheFirst,
        defaultValue,
      } = this.props;
      if (cacheFirst && cache && cache[schema.key] && cache[schema.key][id]) {
        this.setState({
          loading: false,
          data: cache[schema.key][id],
        });
        return;
      }
      const path = id ? `${p}/${id}` : p;
      let query = firebase.database().ref(path);
      if (queryProcessor) {
        query = queryProcessor(query);
      }
      query.on('value', async snapshot => {
        const snapshotData = snapshot.val() || defaultValue;
        if (!snapshotData) {
          this.setState({
            loading: false,
          });
          return;
        }
        if (referencePath) {
          await Promise.all(
            Object.keys(snapshotData).map(async entityID => {
              if (
                cacheFirst &&
                cache &&
                cache[schema.key] &&
                cache[schema.key][entityID]
              ) {
                snapshotData[entityID] = cache[schema.key][entityID];
              } else {
                snapshotData[entityID] = await new Promise(resolve =>
                  firebase
                    .database()
                    .ref(`${referencePath}/${entityID}`)
                    .once('value', s => resolve(s.val()))
                );
              }
            })
          );
        }
        const entities = id
          ? {
              [schema.key]: { [id]: snapshotData },
            }
          : { [schema.key]: snapshotData };
        const data = id
          ? snapshotData
          : denormalize(Object.keys(snapshotData), [schema], entities);
        setCache(entities);
        this.setState({
          loading: false,
          data,
        });
      });
    };

    componentDidMount() {
      this.load();
    }

    render() {
      return (
        <ProgressiveComponent
          {...this.props}
          {...this.state}
          load={this.load}
        />
      );
    }
  }

  return connect(({ cache }) => ({ cache }), { setCache: setCacheAC })(
    ConnectedComponent
  );
};
