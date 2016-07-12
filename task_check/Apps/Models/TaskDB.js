'use strict'
import ConnectDB from './ConnectDB';

class TaskDB {
  constructor() {
    this.db = ConnectDB.db;

    this.db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS task ("
      + "id INTEGER PRIMARY KEY AUTOINCREMENT,"
      + "title VARCHAR(120) NOT NULL,"
      + "content text NOT NULL,"
      + "memo text,"
      + "createdAt TIMESTAMP DEFAULT (DATETIME('now', 'localtime'))"
      + ")"
      );
    });
  }

  selectAll(customFunction) {
    this.db.transaction((tx) => {
      tx.executeSql("SELECT * FROM task", [], (tx, results) => {
        var list = [];
        var len = results.rows.length;

        for (var i = 0; i < len; i++) {
          list.push(results.rows.item(i));
        }

        customFunction(list);
      })
    });
  }

  create(title, content) {
    this.db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO task (title, content) VALUES (?, ?)",
        [title, content]
      );
    });
  }

  remove(id) {
    this.db.transaction((tx) => {
      tx.executeSql("DELETE FROM task WHERE id = ?", [id]);
    });
  }
};

export default new TaskDB();
