const mysql = require("../config/db");

// constructor

const Leave = function (leave) {
  this.employeeId = leave.employeeId;
  this.leaveTypeId = leave.leaveTypeId;
  this.fromDate = leave.fromDate;
  this.toDate = leave.toDate;
  this.remark = leave.remark;
  this.status = leave.status;
  this.approvedBy = leave.approvedBy;
};

// create new subject
Leave.findAll = (result) => {
  const query = `CALL getLeaveRequests()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Leave.findById = (id, result) => {
  let query = `CALL getLeaveRequestById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Leave.create = (leave, result) => {
  const { employeeId, leaveTypeId, fromDate, toDate, remark } = leave;
  mysql.query(
    `CALL createLeaveRequest(?,?,?,?,?)`,
    [employeeId, leaveTypeId, fromDate, toDate, remark],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...leave });
    }
  );
};

//update

Leave.findByIdAndUpdate = (id, event, result) => {
  const { employeeId, leaveTypeId, fromDate, toDate, remark, status } = leave;

  mysql.query(
    `CALL updateLeaveRequest(${id}, ?,?,?,?,?)`,
    [employeeId, leaveTypeId, fromDate, toDate, remark, status],
    (err, res) => {
      if (err) return result(null, err);

      result(null, { ...event });
    }
  );
};

// delete

Leave.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteLeaveRequest(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Leave;
