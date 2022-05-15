const mysql = require("../config/db");

// constructor

const Period = function (period) {
  this.name = period.name;
  this.startTime = period.startTime;
  this.endTime = period.endTime;
};

// create new subject
Period.findAll = (result) => {
  const query = "SELECT * FROM periods ORDER BY periodId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Period.findById = (id, result) => {
  let query = `SELECT * FROM periods WHERE periodId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Period.create = (period, result) => {
  mysql.query("INSERT INTO periods SET ?", period, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...period });
  });
};

//update

Period.findByIdAndUpdate = (id, period, result) => {
  let query = `UPDATE periods SET name = '${period.name}' , startTime = '${period.startTime}' , endTime = '${period.endTime}' WHERE periodId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...period });
  });
};

// delete

Period.findByidAndDelete = (id, result) => {
  let query = `DELETE FROM periods WHERE periodId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Period;
