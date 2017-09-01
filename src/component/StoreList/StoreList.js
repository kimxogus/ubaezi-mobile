import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';

import StoreItem from './StoreItem';

export default class StoreList extends PureComponent {
  favorites = {};

  componentWillReceiveProps({ favorites }) {
    if (favorites && Object.keys(favorites).length) {
      this.favorites = favorites;
    }
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <StoreItem item={item} favorite={!!this.favorites[item.id]} />
  );

  render() {
    const { data } = this.props;

    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        extraData={this.favorites}
      />
    );
  }
}
