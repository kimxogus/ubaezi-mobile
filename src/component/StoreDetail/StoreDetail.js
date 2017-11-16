import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class StoreDetail extends PureComponent {
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
    return (
      <View>
        <Text>{JSON.stringify(this.props.data)}</Text>
      </View>
    );
  }
}
