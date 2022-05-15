const mysql = require("../config/db");

const VehicleType = function (vehicleType) {
  this.type = vehicleType.type;
};

// find all
VehicleType.findAll = (result) => {
  let query = `SELECT * FROM vehicleTypes ORDER BY vehicleTypeId`;

  mysql.query(query, (err, data) => {
    if (err) return result(null, err);

    result(null, data);
  });
};

// findbyId

VehicleType.findById = (id, result) => {
  let query = `SELECT * FROM vehicleTypes WHERE vehicleTypeId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};
// create status
VehicleType.create = (vehicleType, result) => {
  mysql.query("INSERT INTO vehicleTypes SET?", vehicleType, (err, res) => {
    if (err) return err, null;

    result(null, { id: res.insertId, ...vehicleType });
  });
};

// update

VehicleType.findByIdAndUpdate = (id, vehicleType, result) => {
  let query = `UPDATE vehicleTypes SET name = '${vehicleType.type}' WHERE vehicleTypeId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...vehicleType });
  });
};

// delete

VehicleType.findByidAndDelete = (id, result) => {
  let query = `DELETE FROM vehicleTypes WHERE vehicleTypeId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = VehicleType;
