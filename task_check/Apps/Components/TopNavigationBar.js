'use strict'

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import TaskModal from './TaskCreateModal';
import TaskDB from '../Models/TaskDB';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      title: {
        title: "Task List"
      },
      rightButton: {
        title: "+",
        handler: this.onClickRightButton
      },
    };
  },
  onClickRightButton: function() {
    this.refs.taskModal._setModalVisible(true);
  },
  create(title, content) {
    TaskDB.create(title, content);

    this.props.reload();
    this.refs.taskModal._setModalVisible(false);
  },
  render: function() {
    return (
      <View>
        <NavigationBar
          title={this.state.title}
          rightButton={this.state.rightButton}
        />
        <TaskModal
          ref="taskModal"
          action={this.create}
        />
      </View>
    );
  }
});
