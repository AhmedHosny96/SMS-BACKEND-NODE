const mysql = require("../config/db");

// constructor

const Timetable = function (timetable) {
  this.day = timetable.day;
  this.periodId = timetable.periodId;
  this.classId = timetable.classId;
  this.sectionId = timetable.sectionId;
  this.subjectId = timetable.subjectId;
};

// create new subject
Timetable.findAll = (result) => {
  const query = `
  SELECT  DISTINCT t.timetableId , t.day , t.sectionId p.name AS period , c.name AS class  , sec.name AS section  , s.name AS subject FROM timetable t 
  INNER JOIN classes c ON t.classId = c.classId INNER JOIN  periods p ON t.periodId = p.periodId 
  INNER JOIN sections sec ON t.sectionId = sec.sectionId INNER JOIN subjects s ON t.subjectId = s.subjectId
  ORDER BY timetableId ASC`;

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

// find time table by section

Timetable.findBySection = (id, result) => {
  let query = `SELECT * FROM timetable WHERE sectionId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Timetable.create = (timetable, result) => {
  mysql.query("INSERT INTO timetable SET ?", timetable, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...timetable });
  });
};

//update

Timetable.findByIdAndUpdate = (id, timetable, result) => {
  let query = `UPDATE timetable SET day = '${timetable.day}' , periodId = '${timetable.periodId}' , classId = '${timetable.classId}' 
  ,sectionId = '${timetable.sectionId}' ,subjectId = '${timetable.subjectId}'  WHERE timetableId = '${id}'`;

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
