import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import createEmptyList from 'component/EmptyList';

import StoreItem from './StoreItem';

const EmptyList = createEmptyList();

export default class StoreList extends PureComponent {
  static propTypes = {
    data: PropTypes.any,
    favorites: PropTypes.object,
    ListEmptyComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  };

  static defaultProps = {
    favorites: {},
    ListEmptyComponent: EmptyList,
  };

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
    const { data, ListEmptyComponent } = this.props;

    return (
      <FlatList
        ListEmptyComponent={ListEmptyComponent}
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        extraData={this.state}
      />
    );
  }
}
