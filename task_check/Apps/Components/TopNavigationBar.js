'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import StaticSQL from '../sql';
import TaskModal from './TaskCreateModal';
import myStyles from '../style';

const styles = StyleSheet.create(myStyles.myStyles);

module.exports = React.createClass({
  getInitialState: function() {
    return {
      title: {
        title: "Hello"
      },
      leftButton: {
        title: "LEFT",
        handler: this.onClickLeftButton
      },
      rightButton: {
        title: "+",
        handler: this.onClickRightButton
      },
    };
  },
  onClickLeftButton: function() {
    alert("Left");
  },
  onClickRightButton: function() {
    this.refs.taskModal._setModalVisible(true);
  },
  create(title, content) {
    this.props.db.transaction((tx) => {
      tx.executeSql(StaticSQL.taskInsertBySql, [title, content]);
    });

    this.props.reload();
    this.refs.taskModal._setModalVisible(false);
  },
  render: function() {
    return (
      <View>
        <NavigationBar
          title={this.state.title}
          leftButton={this.state.leftButton}
          rightButton={this.state.rightButton}
        />
        <TaskModal
          ref="taskModal"
          db={this.props.db}
          action={this.create}
        />
      </View>
    );
  }
});
