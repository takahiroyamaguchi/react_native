/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import SQLite from 'react-native-sqlite-storage';

class task_check extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <TopNavigationBar/>
                <TaskListBox/>
            </View>
        );
    }
}

const TopNavigationBar = React.createClass({
    getInitialState: function() {
        return {
            title: {
                title: "Hello"
            },
            leftButton: {
                title: "Left",
                handler: this.onClickLeftButton
            },
            rightButton: {
                title: "Right",
                handler: this.onClickRightButton
            },
        };
    },
    onClickLeftButton: function() {
        alert("Left");
    },
    onClickRightButton: function() {
        alert("Right");
    },
    render: function() {
        return (
            <NavigationBar
                title={this.state.title}
                leftButton={this.state.leftButton}
                rightButton={this.state.rightButton}
            />
        );
    }
});

const TaskListBox = React.createClass({
    getInitialState: function() {
        return {
            list: []
        };
    },
    successcb: function() {
        console.log("success");
    },
    errorcb: function(error) {
        console.log("error::" + error);
    },
    render: function() {
        SQLite.openDatabase({name: 'my.db', location: 'default'}, this.successcb, this.errorcb);
            
        return (
            <Text>test</Text>
        );
    }
});

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('task_check', () => task_check);
