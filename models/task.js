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
  const query = `CALL getTasks()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Task.findById = (id, result) => {
  let query = `CALL getTaskById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};

// create roles

Task.create = (tasks, result) => {
  const { task, description, date, priority, status, userId } = tasks;
  mysql.query(
    `CALL createTask(?,?,?,?,?,?)`,
    [task, description, date, priority, status, userId],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...tasks });
    }
  );
};

//update

Task.findByIdAndUpdate = (id, tasks, result) => {
  const { task, description, date, priority, status, userId } = tasks;

  mysql.query(
    `CALL updateTask(${id},?,?,?,?,?,?)`,
    [task, description, date, priority, status, userId],
    (err, res) => {
      if (err) return result(null, err);

      if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...tasks });
    }
  );
};

// delete

Task.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteTasks(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Task;
