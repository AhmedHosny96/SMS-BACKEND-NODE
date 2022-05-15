const mysql = require("../config/db");

// constructor

const Task = function (tasks) {
  this.task = tasks.task;
  this.description = tasks.description;
  this.date = tasks.date;
  this.priority = tasks.priority;
  this.status = tasks.status || "Open";
  this.userId = tasks.userId;
};

// create new subject
Task.findAll = (result) => {
  const query = "SELECT * FROM tasks ORDER BY taskId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Task.findById = (id, result) => {
  let query = `SELECT * FROM tasks WHERE taskId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Task.create = (task, result) => {
  mysql.query("INSERT INTO tasks SET ?", task, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...task });
  });
};

//update

Task.findByIdAndUpdate = (id, task, result) => {
  let query = `UPDATE tasks SET task = '${task.task}' , description = '${task.description}' ,  
  date = '${task.date}' ,userId = '${task.userId}' WHERE taskId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...task });
  });
};

// delete

Task.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM tasks WHERE taskId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Task;
