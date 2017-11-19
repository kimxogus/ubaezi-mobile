// @flow
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';

const keys = ['name', 'branch', 'call', 'address'].map(k => ({
  name: k,
}));

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
    const { loading, data } = this.props;
    if (loading || !data) return null;

    const {} = this.props;

    return [
      <List key="info">
        {keys.map(({ name, action }) => (
          <ListItem key={`${name}`} title={data[name]} onPress={action} />
        ))}
      </List>,
    ];
  }
}
