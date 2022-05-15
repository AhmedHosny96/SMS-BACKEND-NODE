const mysql = require("../config/db");

// constructor

const Subject = function (subject) {
  this.name = subject.name;
  this.code = subject.code;
  this.description = subject.description;
};

// create new subject
Subject.findAll = (result) => {
  const query = "SELECT * FROM subjects ORDER BY subjectId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Subject.findById = (id, result) => {
  let query = `SELECT * FROM subjects WHERE subjectId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Subject.create = (subject, result) => {
  mysql.query("INSERT INTO subjects SET ?", subject, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...subject });
  });
};

//update

Subject.findByIdAndUpdate = (id, subject, result) => {
  let query = `UPDATE subjects SET name = '${subject.name}' , code = '${subject.code}' , description = '${subject.description}' WHERE subjectId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...subject });
  });
};

// delete

Subject.findByidAndDelete = (id, result) => {
  let query = `DELETE FROM subjects WHERE subjectId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Subject;
