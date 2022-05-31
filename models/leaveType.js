const mysql = require("../config/db");

const LeaveType = function (leaveType) {
  this.type = leaveType.type;
  this.allowedDays = leaveType.allowedDays;
};

// find all
LeaveType.findAll = (result) => {
  let query = `SELECT * FROM leaveTypes ORDER BY leaveTypeId`;

  mysql.query(query, (err, data) => {
    if (err) return result(null, err);

    result(null, data);
  });
};

// findbyId

LeaveType.findById = (id, result) => {
  let query = `SELECT * FROM leaveTypes WHERE leaveTypeId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};
// create status
LeaveType.create = (leaveType, result) => {
  mysql.query("INSERT INTO leaveTypes SET?", leaveType, (err, res) => {
    if (err) return result(err, null);

    result(null, { id: res.insertId, ...leaveType });
  });
};

// update

LeaveType.findByIdAndUpdate = (id, leaveType, result) => {
  let query = `UPDATE leaveTypes SET type = '${leaveType.type}' , allowedDays = '${leaveType.allowedDays}' WHERE leaveTypeId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...leaveType });
  });
};

// delete

LeaveType.findByidAndDelete = (id, result) => {
  let query = `DELETE FROM leaveTypes WHERE leaveTypeId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = LeaveType;
