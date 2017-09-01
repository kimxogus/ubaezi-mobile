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
    loading: PropTypes.bool,
    load: PropTypes.func,
  };

  static defaultProps = {
    favorites: {},
    ListEmptyComponent: EmptyList,
    loading: false,
    load: () => {},
  };

  state = {
    favorites: this.props.favorites || {},
  };

  componentWillReceiveProps({ favorites }) {
    this.setState({ favorites: favorites || {} });
  }

  keyExtractor = item => item.id;

  getItemLayout = (data, index) => ({
    length: StoreItem.height,
    offset: StoreItem.height * index,
    index,
  });

  renderItem = ({ item }) => (
    <StoreItem item={item} favorite={!!this.state.favorites[item.id]} />
  );

  render() {
    const { data, ListEmptyComponent, loading, load } = this.props;

    return (
      <FlatList
        onRefresh={load}
        refreshing={loading}
        initialNumToRender={10}
        ListEmptyComponent={ListEmptyComponent}
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        extraData={this.state}
        getItemLayout={this.getItemLayout}
      />
    );
  }
}
