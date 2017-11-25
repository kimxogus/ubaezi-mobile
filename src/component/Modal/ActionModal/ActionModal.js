// @flow
import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import styled from 'styled-components/native';

import Modal, { type Props as ModalProps } from 'component/Modal';

export type Action = {
  name: string,
  action: ?Function,
};

export type Props = {
  actions: ?Array<Action>,
};

export default class ActionModal extends Component<Props & ModalProps> {
  static defaultProps = {
    actions: [],
  };

  toggleVisible = () => this.modal && this.modal.toggleVisible();

  render() {
    const { actions, ...props } = this.props;

    return (
      <Modal ref={ref => (this.modal = ref)} {...props}>
        <List>
          {actions.map(({ name, action }) => (
            <ListItem key={name} title={name} onPress={action} />
          ))}
        </List>
      </Modal>
    );
  }
}
