// @flow
import React, { Component } from 'react';
import connectDB from 'HOC/connectDB';
import { menu } from 'schema';

export default BaseComponent => {
  const WrappedComponent = connectDB({
    schema: menu,
  })(BaseComponent);

  return class extends Component {
    queryProcessor = query =>
      query.orderByChild('menuGroupId').equalTo(this.props.menuGroup.id);

    render() {
      return (
        <WrappedComponent
          {...this.props}
          queryProcessor={this.queryProcessor}
          path="menus"
          defaultValue={[]}
        />
      );
    }
  };
};
