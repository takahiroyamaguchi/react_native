import SQLite from 'react-native-sqlite-storage';

class ConnectDB {
  constructor() {
    this.db = SQLite.openDatabase(
      {name: 'my.db', location: 'default'},
      this.successcb,
      this.errorcb
    );
  }

  successcb() {
  }

  errorcb() {
  }
};

export default new ConnectDB();
