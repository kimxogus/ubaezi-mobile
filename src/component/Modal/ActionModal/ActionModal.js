// @flow
import React, { Component, type Node } from 'react';
import { List, ListItem } from 'react-native-elements';

import Modal, { type Props as ModalProps } from 'component/Modal';

export type Action = {
  name: string,
  action: ?Function,
  closeAfterAction: ?boolean,
};

export type Props = {
  header: ?Node,
  footer: ?Node,
  actions: ?Array<Action>,
};

export default class ActionModal extends Component<Props & ModalProps> {
  static defaultProps = {
    actions: [],
    header: null,
    footer: null,
  };

  modal = null;

  toggleVisible = () => this.modal && this.modal.toggleVisible();

  render() {
    const { header, footer, actions, ...props } = this.props;

    return (
      <Modal ref={ref => (this.modal = ref)} {...props}>
        {header}
        <List>
          {actions.map(({ name, action, closeAfterAction = true }) => (
            <ListItem
              key={name}
              title={name}
              onPress={
                closeAfterAction
                  ? () => {
                      action();
                      this.toggleVisible();
                    }
                  : action
              }
            />
          ))}
        </List>
        {footer}
      </Modal>
    );
  }
}
