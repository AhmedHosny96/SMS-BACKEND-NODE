const mysql = require("../config/db");

const LeaveType = function (leaveType) {
  this.type = leaveType.type;
  this.allowedDays = leaveType.allowedDays;
};

// find all
LeaveType.findAll = (result) => {
  let query = `CALL getLeaveTypes()`;

  mysql.query(query, (err, data) => {
    if (err) return result(null, err);

    result(null, data[0]);
  });
};

// findbyId

LeaveType.findById = (id, result) => {
  let query = `CALL getLeaveById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};
// create status
LeaveType.create = (leaveType, result) => {
  const { type, allowedDays } = leaveType;

  mysql.query("CALL createLeave(?,?)", [type, allowedDays], (err, res) => {
    if (err) return result(err, null);

    result(null, { id: res.insertId, ...leaveType });
  });
};

// update

LeaveType.findByIdAndUpdate = (id, leaveType, result) => {
  const { type, allowedDays } = leaveType;

  mysql.query(
    `CALL updateLeave(${id} , ? , ? )`,
    [type, allowedDays],
    (err, res) => {
      if (err) return result(null, err);

      // if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...leaveType });
    }
  );
};

// delete

LeaveType.findByidAndDelete = (id, result) => {
  let query = `CALL deleteLeave(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = LeaveType;
