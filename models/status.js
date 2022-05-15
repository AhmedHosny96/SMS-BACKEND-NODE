const mysql = require("../config/db");

const Status = function (status) {
  this.name = status.name;
};

// find all
Status.findAll = (result) => {
  let query = `SELECT * FROM statuses ORDER BY statusId`;

  mysql.query(query, (err, data) => {
    if (err) return result(null, err);

    result(null, data);
  });
};

// findbyId

Status.findById = (id, result) => {
  let query = `SELECT * FROM statuses WHERE statusId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};
// create status
Status.create = (status, result) => {
  mysql.query("INSERT INTO statuses SET?", status, (err, res) => {
    if (err) return err, null;

    result(null, { id: res.insertId, ...status });
  });
};

// update

Status.findByIdAndUpdate = (id, status, result) => {
  let query = `UPDATE statuses SET name = '${status.name}' WHERE statusId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...status });
  });
};

// delete

Status.findByidAndDelete = (id, result) => {
  let query = `DELETE FROM statuses WHERE statusId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Status;
