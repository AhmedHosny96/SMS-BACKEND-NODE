const mysql = require("../config/db");

// constructor

const Event = function (event) {
  this.eventType = event.eventType;
  this.eventFor = event.eventFor;
  this.fromDate = event.fromDate;
  this.toDate = event.toDate;
  this.description = event.description;
  //   this.roleId = event.roleId;
  //   this.classId = event.classId;
};

// create new subject
Event.findAll = (result) => {
  const query = "SELECT * FROM events ORDER BY eventId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Event.findById = (id, result) => {
  let query = `SELECT * FROM events WHERE eventId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Event.create = (event, result) => {
  mysql.query("INSERT INTO events SET ?", event, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...event });
  });
};

//update

Event.findByIdAndUpdate = (id, event, result) => {
  let query = `UPDATE events SET eventType = '${event.eventType}' , eventFor = '${event.eventFor}' 
  , fromDate = '${event.fromDate}' , toDate = '${event.toDate}'  , description = '${event.description}' WHERE eventId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...event });
  });
};

// delete

Event.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM events WHERE eventId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Event;
