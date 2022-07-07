const mysql = require("../config/db");

// constructor

const Assesment = function (assesment) {
  this.name = assesment.name;
  this.classId = assesment.classId;
  this.sectionId = assesment.sectionId;
  this.subjectId = assesment.subjectId;
  this.maxMarks = assesment.maxMarks;
};

// create new subject
Assesment.findAll = (result) => {
  const query = "SELECT * FROM assesments ORDER BY assesmentId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Assesment.findById = (id, result) => {
  let query = `SELECT * FROM assesments WHERE assesmentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Assesment.create = (term, result) => {
  mysql.query("INSERT INTO assesments SET ?", term, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...term });
  });
};

//update

Assesment.findByIdAndUpdate = (id, term, result) => {
  let query = `UPDATE assesments SET name = '${term.name}' , academicId = '${term.academicId}' ,  
  startDate = '${term.startDate}' ,endDate = '${term.endDate}' WHERE assesmentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...term });
  });
};

// delete

Assesment.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM assesments WHERE assesmentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Assesment;
