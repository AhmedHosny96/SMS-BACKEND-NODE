const mysql = require("../config/db");

// constructor

const studentAttendance = function (attendance) {
  this.name = attendance.name;
  this.studentId = attendance.studentId;
  this.date = attendance.date;
  this.periodId = attendance.periodId;
  this.status = attendance.status;
};

// create new subject
studentAttendance.findAll = (result) => {
  const query = "SELECT * FROM studentAttendance ORDER BY attendanceId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

studentAttendance.findById = (id, result) => {
  let query = `SELECT * FROM studentAttendance WHERE attendanceId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

studentAttendance.create = (studentAttendance, result) => {
  mysql.query(
    "INSERT INTO studentAttendance SET ?",
    studentAttendance,
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...studentAttendance });
    }
  );
};

//update

studentAttendance.findByIdAndUpdate = (id, attendance, result) => {
  let query = `UPDATE studentAttendance SET studentId = '${attendance.studentId}' , date = '${attendance.date}' ,  
  periodId = '${attendance.periodId}' ,status = '${attendance.status}' WHERE attendanceId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...attendance });
  });
};

// delete

studentAttendance.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM studentAttendance WHERE attendanceId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = studentAttendance;
