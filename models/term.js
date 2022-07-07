const mysql = require("../config/db");

// constructor

const Term = function (term) {
  this.academicId = term.academicId;
  this.name = term.name;
  this.startDate = term.startDate;
  this.endDate = term.endDate;
  this.ethiopianDate = term.ethiopianDate;
  // this.status = term.status;
};

// create new subject
Term.findAll = (result) => {
  const query = `CALL getTerms()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Term.findById = (id, result) => {
  let query = `CALL getTermById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};

// create roles

Term.create = (term, result) => {
  const { academicId, name, startDate, endDate, ethiopianDate } = term;
  mysql.query(
    `CALL createTerm(?,?,?,?,?)`,
    [academicId, name, startDate, endDate, ethiopianDate],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...term });
    }
  );
};

//update

Term.findByIdAndUpdate = (id, term, result) => {
  mysql.query(
    `CALL updateTerm(${id} ,?,?,?,?,?,?)`,
    [academicId, name, startDate, endDate, ethiopianDate],
    (err, res) => {
      if (err) return result(null, err);

      if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...term });
    }
  );
};

// delete

Term.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteTerm(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Term;
