const mysql = require("../config/db");

const Department = function (status) {
  this.name = status.name;
};

// find all
Department.findAll = (result) => {
  let query = `CALL getDeparments()`;

  mysql.query(query, (err, data) => {
    if (err) return result(null, err);

    result(null, data[0]);
  });
};

// findbyId

Department.findById = (id, result) => {
  let query = `CALL getDepartmentById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};
// create status
Department.create = (department, result) => {
  mysql.query(`CALL createDepartment(?)`, [department.name], (err, res) => {
    if (err) return result(err, null);

    result(null, { id: res.insertId, ...department });
  });
};

// update

Department.findByIdAndUpdate = (id, department, result) => {
  mysql.query(`CALL updateDepartment(${id})`, [department.name], (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...department });
  });
};

// delete

Department.findByidAndDelete = (id, result) => {
  let query = `CALL deleteDepartment(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Department;
