const mysql = require("../config/db");

// constructor

const Parent = function (parent) {
  this.parentId = parent.parentId;
  this.fullName = parent.fullName;
  this.phoneNumber = parent.phoneNumber;
  this.email = parent.email;
  this.type = parent.type;
  this.occupation = parent.occupation;
  this.studentId = parent.studentId;
  this.status = parent.status || "Active";
};

// create

module.exports = Parent;
