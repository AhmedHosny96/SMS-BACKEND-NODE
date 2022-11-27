const mysql = require("../config/db");

// constructor

const Event = function (event) {
  this.eventType = event.eventType;
  this.eventFor = event.eventFor;
  this.fromDate = event.fromDate;
  this.toDate = event.toDate;
  this.description = event.description;
  //   this.roleId = event.roleId;
  //   this.classId = event.classId;
};

// 

module.exports = Event;
