// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import MenuGroups from './MenuGroups';
import StoreProps from './StoreProps';

export default class StoreDetail extends Component {
  static propTypes = {
    data: PropTypes.any,
    loading: PropTypes.bool,
    load: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    loading: false,
    load: () => {},
  };

  render() {
    const { loading, data } = this.props;
    if (loading || !data) return null;

    const { id } = data;

    return (
      <ScrollView>
        <StoreProps
          storeData={data}
          cacheFirst
          defaultValue={[]}
          referencePath={`suggestions`}
          path={`/stores/${id}/suggestions`}
        />
        <MenuGroups storeId={id} />
      </ScrollView>
    );
  }
}
