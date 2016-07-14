import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 10
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 5,
    textAlign: "left"
  },
  content: {
    fontSize: 10,
    color: "#656565",
    paddingLeft: 8,
    textAlign: "left"
  },
  separator: {
    height: 1,
    backgroundColor: "#DDDDDD"
  },
  listView: {
    backgroundColor: "#F5FCFF"
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  },
  singleLine: {
    fontSize: 16,
    padding: 4,
    width: 80
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
    color: "#a9a9a9"
  },
  submitButton: {
    marginTop: 10,
    color: "#7fffd4"
  }
});
