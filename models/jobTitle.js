const mysql = require("../config/db");

const JobTitle = function (title) {
  this.name = title.name;
};

// find all
JobTitle.findAll = (result) => {
  let query = `SELECT * FROM jobTitles ORDER BY titleId`;

  mysql.query(query, (err, data) => {
    if (err) return result(null, err);

    result(null, data);
  });
};

// findbyId

JobTitle.findById = (id, result) => {
  let query = `SELECT * FROM jobTitles WHERE titleId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};
// create status
JobTitle.create = (title, result) => {
  mysql.query("INSERT INTO jobTitles SET?", title, (err, res) => {
    if (err) return result(err, null);

    result(null, { id: res.insertId, ...title });
  });
};

// update

JobTitle.findByIdAndUpdate = (id, title, result) => {
  let query = `UPDATE jobTitles SET name = '${title.name}' WHERE titleId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...title });
  });
};

// delete

JobTitle.findByidAndDelete = (id, result) => {
  let query = `DELETE FROM jobTitles WHERE titleId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = JobTitle;
