// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import MenuGroups from './MenuGroups';

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

    const { id } = data;

    return (
      <ScrollView>
        <List>
          {keys.map(({ name, action }) => (
            <ListItem key={`${name}`} title={data[name]} onPress={action} />
          ))}
        </List>
        <MenuGroups storeId={id} />
      </ScrollView>
    );
  }
}
