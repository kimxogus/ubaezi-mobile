// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { Modal, Text, TouchableHighlight } from 'react-native';

class ModalExample extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

import ActionModal from 'component/Modal/ActionModal';

import MenuGroups from './MenuGroups';

const keyMap = {
  name: {
    label: '상호명',
    actions: [{ name: '123123123' }, { name: '123124342343' }],
  },
  branch: {
    label: '지점',
    actions: [{ name: '123123123' }, { name: '123124342343' }],
  },
  call: {
    label: '전화번호',
    actions: [{ name: '123123123' }, { name: '123124342343' }],
  },
  address: {
    label: '주소',
    actions: [{ name: '123123123' }, { name: '123124342343' }],
  },
};

const keys = Object.keys(keyMap).map(k => ({
  name: k,
  label: keyMap[k].label,
  actions: keyMap[k].actions,
}));

class Row extends Component {
  modal = null;

  toggleModal = () => this.modal && this.modal.toggleVisible();

  render() {
    const { name, label, actions, data } = this.props;

    return (
      <View key={`${name}`}>
        <ListItem
          title={data[name] && data[name].length ? data[name] : '-'}
          subtitle={label}
          onPress={this.toggleModal}
        />
        <ActionModal ref={ref => (this.modal = ref)} actions={actions} />
      </View>
    );
  }
}

export default class StoreDetail extends Component {
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
        <ModalExample />
        <List>
          {keys.map(key => <Row key={key.name} {...key} data={data} />)}
        </List>
        <MenuGroups storeId={id} />
      </ScrollView>
    );
  }
}
