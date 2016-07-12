'use strict'

import React, { Component } from 'react';
import { View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import TaskDB from '../Models/TaskDB';

module.exports = React.createClass({
  reload() {
    this.refs.taskListBox.loadTaskList();
  },
  render() {
    console.log(TaskDB.selectAll(function(datas) { console.log(datas); } ));

    return (
      <View style={{flex: 1}}>
      </View>
    );
  }
});
