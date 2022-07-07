const mysql = require("../config/db");

const JobTitle = function (title) {
  this.name = title.name;
};

// find all
JobTitle.findAll = (result) => {
  let query = `CALL getJobTitles()`;

  mysql.query(query, (err, data) => {
    if (err) return result(null, err);

    result(null, data[0]);
  });
};

// findbyId

JobTitle.findById = (id, result) => {
  let query = `CALL getJobTitleById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};
// create status
JobTitle.create = (title, result) => {
  mysql.query(`CALL createJobtitle(?)`, [title.name], (err, res) => {
    if (err) return result(err, null);

    result(null, { id: res.insertId, ...title });
  });
};

// update

JobTitle.findByIdAndUpdate = (id, title, result) => {
  mysql.query(`CALL updateJobTitle(${id} , ?)`, [title.name], (err, res) => {
    if (err) return result(null, err);

    result(null, { ...title });
  });
};

// delete

JobTitle.findByidAndDelete = (id, result) => {
  let query = ` CALL deleteJobTitle(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = JobTitle;
