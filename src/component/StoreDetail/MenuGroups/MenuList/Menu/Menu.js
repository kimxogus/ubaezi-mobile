import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

export default class Menu extends Component {
  render() {
    const { name, price, description } = this.props;
    return (
      <ListItem
        title={name}
        subtitle={`₩${price}${
          description && description.length ? `- ${description}` : ''
        }`}
      />
    );
  }
}
