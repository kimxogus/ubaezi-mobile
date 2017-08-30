import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';

export default class StoreList extends Component {
  render() {
    const { loading, data } = this.props;

    if (loading) {
      return null;
    } else {
      return (
        <Text>
          {JSON.stringify(data)}
        </Text>
      );
    }
  }
}
