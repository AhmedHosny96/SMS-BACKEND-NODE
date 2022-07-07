const mysql = require("../config/db");

//
const Role = function (role) {
  this.name = role.name;
};

// get all roles

Role.findAll = (result) => {
  const query = "CALL getRoles()";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Role.findById = (id, result) => {
  let query = `CALL getRoleById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};

// create roles

Role.create = (role, result) => {
  const { name } = role;
  mysql.query(`CALL createRole(?)`, [name], (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...role });
  });
};

//update

Role.findByIdAndUpdate = (id, role, result) => {
  const { name } = role;

  mysql.query(`CALL updateRole(${id} , ?)`, [name], (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...role });
  });
};

// delete

Role.findByidAndDelete = (id, result) => {
  let query = `CALL deleteRole(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Role;
