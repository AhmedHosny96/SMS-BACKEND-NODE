const mysql = require("../config/db");

// constructor

const StudentDocument = function (document) {
  this.type = document.type;
  this.description = document.description;
  this.attachment = document.attachment;
  this.studentId = document.studentId;
};

module.exports = StudentDocument;
