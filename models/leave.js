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
  const query =
    "SELECT l.leaveId , l.fromDate , l.toDate , l.status , l.approvedBy , t.type AS leaveType , concat (e.firstName , ' ' , e.middleName , e.lastName) AS employeeName   FROM leaves l INNER JOIN leaveTypes t ON l.leaveTypeId = t.leaveTypeId  INNER JOIN employees e ON l.employeeId = e.employeeId   ORDER BY leaveId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Leave.findById = (id, result) => {
  let query = `SELECT * FROM leaves WHERE leaveId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Leave.create = (leave, result) => {
  mysql.query("INSERT INTO leaves SET ?", leave, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...leave });
  });
};

//update

Leave.findByIdAndUpdate = (id, event, result) => {
  let query = `UPDATE leaves SET employeeId = '${event.employeeId}' , leaveTypeId = '${event.leaveTypeId}' 
  , fromDate = '${event.fromDate}' , toDate = '${event.toDate}'  , remark = '${event.remark}' , status = '${event.status}' , approvedBy = '${event.approvedBy}'  WHERE leaveId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, { ...event });
  });
};

// delete

Leave.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM leaves WHERE leaveId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Leave;
