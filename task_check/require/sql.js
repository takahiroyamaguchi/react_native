const tableTaskCreateSql = "CREATE TABLE IF NOT EXISTS task ("
                    + "id INTEGER PRIMARY KEY AUTOINCREMENT,"
                    + "title VARCHAR(120) NOT NULL,"
                    + "content text NOT NULL,"
                    + "memo text,"
                    + "createdAt TIMESTAMP DEFAULT (DATETIME('now', 'localtime'))"
                    + ")";

const taskSelectAllSql = "SELECT * FROM task";

const taskInsertBySql = "INSERT INTO task (title, content) VALUES (?, ?)";

const taskDeleteByIdSql = "DELETE FROM task WHERE id = ?";

function successcb() {
    console.log("success");
};

function errorcb() {
    console.log("error");
};

export default {
  tableTaskCreateSql,
  taskSelectAllSql,
  taskInsertBySql,
  taskDeleteByIdSql,
  successcb,
  errorcb
};
