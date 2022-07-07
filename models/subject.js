const mysql = require("../config/db");

// constructor

const Subject = function (subject) {
  this.name = subject.name;
  this.code = subject.code;
  this.description = subject.description;
};

// create new subject
Subject.findAll = (result) => {
  const query = "CALL getSubjects()";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Subject.findById = (id, result) => {
  let query = `CALL getSubject(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Subject.create = (subject, result) => {
  const { name, code, description } = subject;

  mysql.query(
    `CALL createSubject(? , ? , ? )`,
    [name, code, description],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...subject });
    }
  );
};

//update

Subject.findByIdAndUpdate = (id, subject, result) => {
  const { name, code, description } = subject;

  mysql.query(
    `CALL updateSubject(${id})`,
    [name, code, description],
    (err, res) => {
      if (err) return result(null, err);

      // if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...subject });
    }
  );
};

// delete

Subject.findByidAndDelete = (id, result) => {
  let query = `CALL deleteSubject(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Subject;
