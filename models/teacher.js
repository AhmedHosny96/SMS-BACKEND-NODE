const mysql = require("../config/db");

// constructor

const Teacher = function (teacher) {
  this.teacherId = teacher.teacherId;
  this.firstName = teacher.firstName;
  this.middleName = teacher.middleName;
  this.lastName = teacher.lastName;
  this.phoneNumber = teacher.phoneNumber;
  this.email = teacher.email;
  this.statusId = teacher.statusId || 1;
};

// create new subject
Teacher.findAll = (result) => {
  const query = "SELECT * FROM teachers ORDER BY teacherId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Teacher.findById = (id, result) => {
  let query = `SELECT * FROM teachers WHERE teacherId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Teacher.create = (parent, result) => {
  mysql.query("INSERT INTO teachers SET ?", parent, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...parent });
  });
};

//update

Teacher.findByIdAndUpdate = (id, teacher, result) => {
  let query = `UPDATE teachers SET firstName = '${teacher.firstName}' , middleName = '${teacher.middleName}' , lastName = '${teacher.lastName}' , phoneNumber = '${teacher.phoneNumber}' 
  , email = '${teacher.email}'  , statusId = '${teacher.statusId}' WHERE teacherId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...teacher });
  });
};

// delete

Teacher.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM teachers WHERE teacherId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Teacher;
