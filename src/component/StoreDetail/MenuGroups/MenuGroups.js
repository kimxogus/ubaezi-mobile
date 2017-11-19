import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';

export default class MenuGroups extends Component {
  render() {
    console.log(this.props.id, this.props.path, this.props.data);
    return (
      <List>
        {/* {keys.map(({ name, action }) => (
        <ListItem key={`${name}`} title={data[name]} onPress={action} />
      ))} */}
      </List>
    );
  }
}
