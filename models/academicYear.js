const mysql = require("../config/db");

// constructor

const AcademicYear = function (session) {
  this.name = session.name;
  this.startDate = session.startDate;
  this.endDate = session.endDate;
  this.ethiopianYear = session.ethiopianYear;
  //   this.status_id = session.status_id;
};

// create new subject
AcademicYear.findAll = (result) => {
  const query = "SELECT * FROM academicYear ORDER BY academicId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

AcademicYear.findById = (id, result) => {
  let query = `SELECT * FROM academicYear WHERE academicId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

AcademicYear.create = (session, result) => {
  mysql.query("INSERT INTO academicYear SET ?", session, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...session });
  });
};

//update

AcademicYear.findByIdAndUpdate = (id, session, result) => {
  let query = `UPDATE academicYear SET name = '${session.name}' , startDate = '${session.startDate}' , endDate = '${session.endDate}' , ethiopianYear = '${session.ethiopianYear}' WHERE academicId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...session });
  });
};

// delete

AcademicYear.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM academicYear WHERE academicId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = AcademicYear;
