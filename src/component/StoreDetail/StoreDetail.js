// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import MenuGroups from './MenuGroups';

const keyMap = {
  name: {
    label: '상호명',
  },
  branch: {
    label: '지점',
  },
  call: {
    label: '전화번호',
  },
  address: {
    label: '주소',
  },
};

const keys = Object.keys(keyMap).map(k => ({
  name: k,
  label: keyMap[k].label,
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
          {keys.map(({ name, label, action }) => (
            <ListItem
              key={`${name}`}
              title={data[name] && data[name].length ? data[name] : '-'}
              subtitle={label}
              onPress={action}
            />
          ))}
        </List>
        <MenuGroups storeId={id} />
      </ScrollView>
    );
  }
}
