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

module.exports = Task;
