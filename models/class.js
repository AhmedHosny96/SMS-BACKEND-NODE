const mysql = require("../config/db");

const Class = function (classes) {
  this.name = classes.name;
  this.description = classes.description;
};

//
Class.findAll = (result) => {
  let query = `SELECT * FROM classes ORDER BY classId ASC`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};

// by id
Class.findById = (id, result) => {
  let query = `SELECT id , name , description FROM classes WHERE classId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};

Class.create = (data, result) => {
  mysql.query(`INSERT INTO classes SET ?`, data, (err, res) => {
    if (err) return result(null, err);

    result(null, { id: res.insertId, ...data });
  });
};

//update

Class.findByIdAndUpdate = (id, data, result) => {
  let query = `UPDATE classes SET name = '${data.name}'  , description = '${data.description}' WHERE classId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...data });
  });
};

// delete

Class.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM classes WHERE classId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Class;
