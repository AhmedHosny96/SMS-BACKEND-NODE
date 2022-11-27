const mysql = require("../config/db");

const Status = function (status) {
  this.name = status.name;
};

module.exports = Status;
