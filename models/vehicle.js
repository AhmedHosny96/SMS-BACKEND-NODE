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
  this.vehicleTypeId = vehicle.vehicleTypeId || 1;
};

// create new subject
Vehicle.findAll = (result) => {
  const query = "SELECT * FROM vehicles ORDER BY vehicleId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Vehicle.findById = (id, result) => {
  let query = `SELECT * FROM vehicles WHERE vehicleId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Vehicle.create = (vehicle, result) => {
  mysql.query("INSERT INTO vehicles SET ?", vehicle, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...vehicle });
  });
};

//update

Vehicle.findByIdAndUpdate = (id, vehicle, result) => {
  let query = `UPDATE vehicles SET plateNumber = '${vehicle.plateNumber}' , noOfSeats = '${vehicle.noOfSeats}' 
  , maximumStudents = '${vehicle.maximumStudents}' , rentedAmount = '${vehicle.rentedAmount}' , vehicleTypeId = '${vehicle.vehicleTypeId}' WHERE vehicleId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...vehicle });
  });
};

// delete

Vehicle.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM drivers WHERE vehicleId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Vehicle;
