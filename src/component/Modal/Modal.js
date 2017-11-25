// @flow
import React, { Component, type Node } from 'react';
import { Button, Divider } from 'react-native-elements';
import RNModal from 'react-native-modal-overlay';

export type Props = {
  visible: ?boolean,
  children: ?Node,
};

export type State = {
  visible: boolean,
};

const styles = {
  modalInnerContainer: {
    alignItems: 'stretch',
  },
  divider: { height: 15, backgroundColor: 'transparent' },
};

export default class Modal extends Component<Props, State> {
  static defaultProps = {
    visible: false,
    onRequestClose: () => {},
  };

  state = {
    visible: this.props.visible,
  };

  toggleVisible = () => {
    this.setState(({ visible }) => ({ visible: !visible }));
  };

  render() {
    const { visible } = this.state;
    const { children, ...props } = this.props;

    return (
      <RNModal
        {...props}
        visible={visible}
        childrenWrapperStyle={styles.modalInnerContainer}
      >
        {children}

        <Divider style={styles.divider} />

        <Button raised title="닫기" onPress={this.toggleVisible} />
      </RNModal>
    );
  }
}
