const mysql = require("../config/db");

// constructor

const AcademicYear = function (session) {
  this.name = session.name;
  this.startDate = session.startDate;
  this.endDate = session.endDate;
  this.ethiopianYear = session.ethiopianYear;
  this.status = session.status || "Active";
};

// create new subject
AcademicYear.findAll = (result) => {
  const query = `CALL getSessions()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

AcademicYear.findById = (id, result) => {
  let query = `CALL getSessionById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};

// create roles

AcademicYear.create = (session, result) => {
  const { name, startDate, endDate, ethiopianYear } = session;

  mysql.query(
    `CALL createSession(?,?,?,?)`,
    [name, startDate, endDate, ethiopianYear],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...session });
    }
  );
};

//update

AcademicYear.findByIdAndUpdate = (id, session, result) => {
  const { name, startDate, endDate, ethiopianYear } = session;

  mysql.query(
    `CALL updateSession(${id} , ?,?,?,?,?)`,
    [name, startDate, endDate, ethiopianYear],
    (err, res) => {
      if (err) return result(null, err);

      if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

      result(null, { ...session });
    }
  );
};

// delete

AcademicYear.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteSession(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = AcademicYear;
