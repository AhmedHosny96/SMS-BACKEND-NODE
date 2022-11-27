const mysql = require("../config/db");

// constructor

const Timetable = function (timetable) {
  this.day = timetable.day;
  this.periodId = timetable.periodId;
  this.classId = timetable.classId;
  this.sectionId = timetable.sectionId;
  this.subjectId = timetable.subjectId;
};

module.exports = Timetable;
