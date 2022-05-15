const mysql = require("../config/db");

// constructor

const Timetable = function (timetable) {
  this.date = timetable.date;
  this.periodId = timetable.periodId;
  this.classId = timetable.classId;
  this.sectionId = timetable.sectionId;
  this.subjectId = timetable.subjectId;
  this.shiftId = timetable.shiftId;
};

// create new subject
Timetable.findAll = (result) => {
  const query = "SELECT * FROM timetable ORDER BY timetableId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Timetable.findById = (id, result) => {
  let query = `SELECT * FROM timetable WHERE timetableId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Timetable.create = (shift, result) => {
  mysql.query("INSERT INTO timetable SET ?", shift, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...shift });
  });
};

//update

Timetable.findByIdAndUpdate = (id, timetable, result) => {
  let query = `UPDATE timetable SET date = '${timetable.date}' , periodId = '${timetable.periodId}' , classId = '${timetable.classId}' 
  ,sectionId = '${timetable.sectionId}' ,subjectId = '${timetable.subjectId}' ,  shiftId = '${timetable.shiftId}'  WHERE timetableId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...timetable });
  });
};

// delete

Timetable.findByidAndDelete = (id, result) => {
  let query = `DELETE FROM timetable WHERE timetableId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Timetable;
