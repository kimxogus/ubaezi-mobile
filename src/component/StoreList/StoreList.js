import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';

import StoreItem from './StoreItem';

export default class StoreList extends PureComponent {
  state = {
    favorites: this.props.favorites || {},
  };

  componentWillReceiveProps({ favorites }) {
    this.setState({ favorites: favorites || {} });
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <StoreItem item={item} favorite={!!this.state.favorites[item.id]} />
  );

  render() {
    const { data } = this.props;

    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        extraData={this.state}
      />
    );
  }
}
