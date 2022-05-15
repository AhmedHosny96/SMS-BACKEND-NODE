const mysql = require("../config/db");

// constructor

const Shift = function (shift) {
  this.name = shift.name;
  this.startTime = shift.startTime;
  this.endTime = shift.endTime;
};

// create new subject
Shift.findAll = (result) => {
  const query = "SELECT * FROM shifts ORDER BY shiftId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Shift.findById = (id, result) => {
  let query = `SELECT * FROM shifts WHERE shiftId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Shift.create = (shift, result) => {
  mysql.query("INSERT INTO shifts SET ?", shift, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...shift });
  });
};

//update

Shift.findByIdAndUpdate = (id, shift, result) => {
  let query = `UPDATE shifts SET name = '${shift.name}' , startTime = '${shift.startTime}' , endTime = '${shift.endTime}' WHERE shiftId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...shift });
  });
};

// delete

Shift.findByidAndDelete = (id, result) => {
  let query = `DELETE FROM shifts WHERE shiftId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Shift;
