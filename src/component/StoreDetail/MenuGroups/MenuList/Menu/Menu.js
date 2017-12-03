import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

const style = {
  borderBottomWidth: 0,
};
export default class Menu extends Component {
  render() {
    const { name, price, description } = this.props;
    return (
      <ListItem
        title={name}
        containerStyle={style}
        subtitle={`₩${price}${
          description && description.length ? `  - ${description}` : ''
        }`}
      />
    );
  }
}
