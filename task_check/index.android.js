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


var task_check = React.createClass({
  connectDb() {
    return SQLite.openDatabase(
      {name: 'my.db', location: 'default'},
      StaticSQL.successcb,
      StaticSQL.errorcb
    );
  },
  reload() {
    this.refs.taskListBox.loadTaskList();
  },
  render() {
    let db = this.connectDb();

    return (
      <View style={{flex: 1}}>
        <TopNavigationBar reload={this.reload} db={db}/>
        <TaskListBox ref="taskListBox" db={db}/>
      </View>
    );
  }
});
/**
class task_check extends React.Component {
  connectDb() {
    return SQLite.openDatabase(
      {name: 'my.db', location: 'default'},
      StaticSQL.successcb,
      StaticSQL.errorcb
    );
  }

  reload() {
    console.log(this._taskListBox);
    this._taskListBox.loadTaskList();
  }

  render() {
    let db = this.connectDb();

    return (
      <View style={{flex: 1}}>
        <TopNavigationBar reload={this.reload} db={db}/>
        <TaskListBox ref={component => this._taskListBox = component} db={db}/>
      </View>
    );
  }
}
*/

const TaskModal = React.createClass({
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
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <View>
                <Text>Title</Text>
                <TextInput
                    ref="title"
                    key="none"
                    autoCapitalize="none"
                    onChangeText={(title) => this.setState({title: title}) }
                    value={this.state.title}
                    style={styles.singleLine}
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
                    style={styles.singleLine}
                />
              </View>
              <Button style={styles.submitButton} onPress={() => this.props.action(this.state.title, this.state.content)}>
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

const TopNavigationBar = React.createClass({
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

AppRegistry.registerComponent('task_check', () => task_check);
