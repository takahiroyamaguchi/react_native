'use strict'

import React, { Component } from 'react';
import { View } from 'react-native';
import TopNavigationBar from './TopNavigationBar';
import TaskList from './TaskList';
import MyStyle from '../Styles/Style';

module.exports = React.createClass({
  reload() {
    this.refs.taskList.loadTaskList();
  },
  render() {
    return (
      <View style={{flex: 1}}>
        <TopNavigationBar reload={this.reload}/>
        <TaskList ref="taskList"/>
      </View>
    );
  }
});
