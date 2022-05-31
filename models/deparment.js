const mysql = require("../config/db");

const Department = function (status) {
  this.name = status.name;
};

// find all
Department.findAll = (result) => {
  let query = `SELECT * FROM departments ORDER BY departmentId`;

  mysql.query(query, (err, data) => {
    if (err) return result(null, err);

    result(null, data);
  });
};

// findbyId

Department.findById = (id, result) => {
  let query = `SELECT * FROM departments WHERE departmentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};
// create status
Department.create = (department, result) => {
  mysql.query("INSERT INTO departments SET?", department, (err, res) => {
    if (err) return result(err, null);

    result(null, { id: res.insertId, ...department });
  });
};

// update

Department.findByIdAndUpdate = (id, status, result) => {
  let query = `UPDATE departments SET name = '${status.name}' WHERE departmentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...status });
  });
};

// delete

Department.findByidAndDelete = (id, result) => {
  let query = `DELETE FROM departments WHERE departmentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Department;
