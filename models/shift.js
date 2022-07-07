const mysql = require("../config/db");

// constructor

const Shift = function (shift) {
  this.name = shift.name;
  this.startTime = shift.startTime;
  this.endTime = shift.endTime;
};

// create new subject
Shift.findAll = (result) => {
  const query = "CALL getShifts() ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Shift.findById = (id, result) => {
  let query = `CALL getShiftById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Shift.create = (shift, result) => {
  const { name, startTime, endTime } = shift;
  mysql.query(
    `CALL createShift(?,?,?)`,
    [name, startTime, endTime],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...shift });
    }
  );
};

//update

Shift.findByIdAndUpdate = (id, shift, result) => {
  const { name, startTime, endTime } = shift;

  mysql.query(
    `CALL updateShift(${id} , ?,?,?)`,
    [name, startTime, endTime],
    (err, res) => {
      if (err) return result(null, err);

      // if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...shift });
    }
  );
};

// delete

Shift.findByidAndDelete = (id, result) => {
  let query = `CALL deleteShift(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Shift;
