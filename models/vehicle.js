const mysql = require("../config/db");

// constructor

const Vehicle = function (vehicle) {
  this.vehicleId = vehicle.vehicleId;
  this.ownerName = vehicle.ownerName;
  this.ownerPhoneNumber = vehicle.ownerPhoneNumber;
  this.plateNumber = vehicle.plateNumber;
  this.noOfSeats = vehicle.noOfSeats;
  this.maximumStudents = vehicle.maximumStudents;
  this.rentedAmount = vehicle.rentedAmount;
  this.type = vehicle.type;
};

// create new subject
Vehicle.findAll = (result) => {
  const query = "CALL getVehicles() ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Vehicle.findById = (id, result) => {
  let query = `CALL getVehicleById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Vehicle.create = (vehicle, result) => {
  const {
    type,
    ownerName,
    ownerPhoneNumber,
    plateNumber,
    noOfSeats,
    maximumStudents,
    rentedAmount,
  } = vehicle;

  mysql.query(
    `CALL createVehicle(?,?,?,?,?,?,?)`,
    [
      type,
      ownerName,
      ownerPhoneNumber,
      plateNumber,
      noOfSeats,
      maximumStudents,
      rentedAmount,
    ],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...vehicle });
    }
  );
};

//update

Vehicle.findByIdAndUpdate = (id, vehicle, result) => {
  const {
    type,
    ownerName,
    ownerPhoneNumber,
    plateNumber,
    noOfSeats,
    maximumStudents,
    rentedAmount,
  } = vehicle;

  mysql.query(
    `CALL updateVehicle(?,?,?,?,?,?,?,?)`,
    [
      type,
      ownerName,
      ownerPhoneNumber,
      plateNumber,
      noOfSeats,
      maximumStudents,
      rentedAmount,
    ],
    (err, res) => {
      if (err) return result(null, err);

      // if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...vehicle });
    }
  );
};

// delete

Vehicle.findByIdAndDelete = (id, result) => {
  let query = ` CALL deleteVehicle(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Vehicle;
