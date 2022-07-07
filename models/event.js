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
  const query = "CALL getEvents()";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Event.findById = (id, result) => {
  let query = `CALL getEventById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};

// create roles

Event.create = (event, result) => {
  const { eventType, eventFor, fromDate, toDate, description } = event;

  mysql.query(
    "CALL createEvent(?,?,?,?,?)",
    [eventType, eventFor, fromDate, toDate, description],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...event });
    }
  );
};

//update

Event.findByIdAndUpdate = (id, event, result) => {
  const { eventType, eventFor, fromDate, toDate, description } = event;

  mysql.query(
    `CALL updateEvent(${id},?,?,?,?,?)`,
    [eventType, eventFor, fromDate, toDate, description],
    (err, res) => {
      if (err) return result(null, err);

      // if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...event });
    }
  );
};

// delete

Event.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteEvent(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Event;
