'use strict'

import React, { Component } from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';
import MyStyle from '../Styles/Style';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      animationType: "none",
      modalVisible: false,
      transparent: false,
      inputData: {
        title: "",
        content: ""
      }
    };
  },
  _setModalVisible: function(visible) {
    this.setState({modalVisible: visible});
  },
  _setAnimation: function(type) {
    this.setState({animationType: type});
  },
  _toggleTransparent: function() {
    this.setState({transparent: !this.state.transparent});
  },
  render: function() {
    return (
      <View>
        <Modal
            animationType={this.state.animationType}
            transparent={this.state.transparent}
            visible={this.state.modalVisible}
            onRequestClose={() => { this._setModalVisible(false) }}
        >
          <View style={MyStyle.container}>
            <View style={MyStyle.innerContainer}>
              <View>
                <Text>Title</Text>
                <TextInput
                    ref="title"
                    key="none"
                    autoCapitalize="none"
                    onChangeText={(title) => this.setState({title: title}) }
                    value={this.state.title}
                    style={MyStyle.singleLine}
                />
              </View>
              <View>
                <Text>Content</Text>
                <TextInput
                    ref="content"
                    key="none"
                    autoCapitalize="none"
                    onChangeText={(content) => this.setState({content: content})}
                    value={this.state.content}
                    style={MyStyle.singleLine}
                />
              </View>
              <Button style={MyStyle.submitButton} onPress={() => this.props.action(this.state.title, this.state.content)}>
                登録
              </Button>
              <Button style={this.modalButton} onPress={() => this._setModalVisible(false)}>
                キャンセル
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
});
