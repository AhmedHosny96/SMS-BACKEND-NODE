const mysql = require("../config/db");

// constructor

const Teacher = function (teacher) {
  this.teacherId = teacher.teacherId;
  this.firstName = teacher.firstName;
  this.middleName = teacher.middleName;
  this.lastName = teacher.lastName;
  this.phoneNumber = teacher.phoneNumber;
  this.email = teacher.email;
  this.statusId = teacher.statusId || 1;
};


module.exports = Teacher;
