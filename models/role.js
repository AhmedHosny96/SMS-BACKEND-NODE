const mysql = require("../config/db");

//
const Role = function (role) {
  this.name = role.name;
};

// get all roles

Role.findAll = (result) => {
  const query = "SELECT * FROM roles ORDER BY roleId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Role.findById = (id, result) => {
  let query = `SELECT * FROM roles WHERE roleId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Role.create = (role, result) => {
  mysql.query("INSERT INTO roles SET ?", role, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...role });
  });
};

//update

Role.findByIdAndUpdate = (id, role, result) => {
  let query = `UPDATE roles SET name = '${role.name}' WHERE roleId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...role });
  });
};

// delete

Role.findByidAndDelete = (id, result) => {
  let query = `DELETE FROM roles WHERE roleId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Role;
