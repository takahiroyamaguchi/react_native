'use strict'

import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import MyStyle from '../Styles/Style';
import TaskDB from '../Models/TaskDB';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      list: []
    };
  },
  componentWillMount() {
    this.loadTaskList();
  },
  loadTaskList: function() {
    var that = this;

    TaskDB.selectAll(function(list) {
      that.setState({list: list});
    });
  },
  taskList: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.state.list);
  },
  deleteRow: function(data, secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    TaskDB.remove(data.id);
    this.loadTaskList();
  },
  renderTasks: function(task) {
    return (
      <TouchableHighlight
          onPress={ _ => console.log("touched!!") }
          style={MyStyle.rowFront}
          underlayColor={"#AAA"}>
        <View style={MyStyle.rightContainer}>
          <Text style={MyStyle.title}>{task.title}</Text>
          <Text style={MyStyle.content}>{task.content}</Text>
        </View>
      </TouchableHighlight>
    );
  },
  render: function() {
    return (
      <SwipeListView
          dataSource={this.taskList()}
          renderRow={ data => this.renderTasks(data) }
          renderHiddenRow={ (data, secId, rowId, rowMap) => (
              <View style={MyStyle.rowBack}>
                <TouchableOpacity
                    style={[MyStyle.backRightBtn, MyStyle.backRightBtnRight]}
                    onPress={ _ => this.deleteRow(data, secId, rowId, rowMap)  }>
                  <Text style={MyStyle.backTextWhite}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          leftOpenValue={0}
          rightOpenValue={-75}/>
    );
  }
});
