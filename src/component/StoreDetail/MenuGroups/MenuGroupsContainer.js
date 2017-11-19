// @flow
import React, { Component } from 'react';
import connectDB from 'HOC/connectDB';
import { menuGroup } from 'schema';

export default BaseComponent => {
  const WrappedComponent = connectDB({
    schema: menuGroup,
  })(BaseComponent);

  return class extends Component {
    queryProcessor = query =>
      query.orderByChild('storeId').equalTo(this.props.storeId);

    render() {
      return (
        <WrappedComponent
          {...this.props}
          queryProcessor={this.queryProcessor}
          path="menuGroups"
          defaultValue={[]}
        />
      );
    }
  };
};
