const mysql = require("../config/db");

// constructor

const Term = function (term) {
  this.academicId = term.academicId;
  this.name = term.name;
  this.startDate = term.startDate;
  this.endDate = term.endDate;
  this.ethiopianDate = term.ethiopianDate;
};

// create new subject
Term.findAll = (result) => {
  const query =
    "SELECT t.termId , t.name , t.startDate ,  t.endDate , t.ethiopianDate , a.name AS session FROM terms t INNER JOIN academicyear a ON t.academicId = a.academicId ORDER BY termId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Term.findById = (id, result) => {
  let query = `SELECT * FROM terms WHERE termId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Term.create = (term, result) => {
  mysql.query("INSERT INTO terms SET ?", term, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...term });
  });
};

//update

Term.findByIdAndUpdate = (id, term, result) => {
  let query = `UPDATE terms SET name = '${term.name}' , academicId = '${term.academicId}' ,  
  startDate = '${term.startDate}' ,endDate = '${term.endDate}' WHERE termId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...term });
  });
};

// delete

Term.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM terms WHERE termId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Term;
