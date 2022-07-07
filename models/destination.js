const mysql = require("../config/db");

// constructor

const Leave = function (destination) {
  this.vehicleId = destination.vehicleId;
  this.driverId = destination.driverId;
  this.code = destination.code;
  this.startPoint = destination.startPoint;
  this.stopPoint = destination.stopPoint;
};

// create new subject
Leave.findAll = (result) => {
  const query = `CALL getDestinations()`;
  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Leave.findById = (id, result) => {
  let query = `CALL getDestinationById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Leave.create = (route, result) => {
  const { code, startPoint, stopPoint, vehicleId, driverId } = route;

  mysql.query(
    `CALL createDestination(?,?,?,?,?)`,
    [code, startPoint, stopPoint, vehicleId, driverId],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...route });
    }
  );
};

//update

Leave.findByIdAndUpdate = (id, route, result) => {
  const { code, startPoint, stopPoint, vehicleId, driverId } = route;

  mysql.query(
    `CALL updateDestination(${id} , ? , ? , ? , ? , ?)`,
    [code, startPoint, stopPoint, vehicleId, driverId],
    (err, res) => {
      if (err) return result(null, err);

      result(null, { ...route });
    }
  );
};

// delete

Leave.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteDestination(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Leave;
