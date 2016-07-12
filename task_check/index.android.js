/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Modal,
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import SQLite from 'react-native-sqlite-storage';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import Button from 'react-native-button';
import StaticSQL from './require/sql';
import myStyles from './require/style';
import Main from './Apps/Components/Main';


const TaskListBox = React.createClass({
  getInitialState: function() {
    return {
      list: []
    };
  },
  componentWillMount() {
    this.initDB();
    this.loadTaskList();
  },
  initDB: function() {
    this.props.db.transaction((tx) => {
      //tx.executeSql("DROP TABLE task");
      tx.executeSql(StaticSQL.tableTaskCreateSql);

      /* for (var i = 1; i <= 15; i++) {
       *   tx.executeSql("INSERT INTO task(title, content) VALUES ('test" + i + "', 'content" + i + "')");
       * }*/
    });
  },
  loadTaskList: function() {
    var that = this;

    this.props.db.transaction((tx) => {
      tx.executeSql(StaticSQL.taskSelectAllSql, [], (tx, results) => {
        var len = results.rows.length;
        var list = [];

        for (let i = 0; i < len; i++) {
          list.push(results.rows.item(i));
        }

        that.setState({list: list});
      });
    });
  },
  taskList: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.state.list);
  },
  deleteRow: function(data, secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    this.props.db.transaction((tx) => {
      tx.executeSql(StaticSQL.taskDeleteByIdSql, [data.id], (tx, result) => {});
    });
    this.loadTaskList();
  },
  renderTasks: function(task) {
    return (
      <TouchableHighlight
          onPress={ _ => console.log("touched!!") }
          style={styles.rowFront}
          underlayColor={"#AAA"}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.content}>{task.content}</Text>
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
              <View style={styles.rowBack}>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={ _ => this.deleteRow(data, secId, rowId, rowMap)  }>
                  <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          leftOpenValue={0}
          rightOpenValue={-75}/>
    );
  }
});

const styles = StyleSheet.create(myStyles.myStyles);

AppRegistry.registerComponent('task_check', () => Main);
