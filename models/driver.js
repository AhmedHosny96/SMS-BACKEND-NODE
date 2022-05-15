const mysql = require("../config/db");

// constructor

const Driver = function (driver) {
  this.driverId = driver.driverId;
  this.fullName = driver.fullName;
  this.phoneNumber = driver.phoneNumber;
  this.licenceNumber = driver.licenceNumber;
  this.dob = driver.dob;
  this.vehicleId = driver.vehicleId || 1;
};

// create new subject
Driver.findAll = (result) => {
  const query = "SELECT * FROM drivers ORDER BY driverId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Driver.findById = (id, result) => {
  let query = `SELECT * FROM drivers WHERE driverId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Driver.create = (driver, result) => {
  mysql.query("INSERT INTO drivers SET ?", driver, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...driver });
  });
};

//update

Driver.findByIdAndUpdate = (id, driver, result) => {
  let query = `UPDATE drivers SET fullName = '${driver.fullName}' , phoneNumber = '${driver.phoneNumber}' 
  , licenceNumber = '${driver.licenceNumber}' , dob = '${driver.dob}' , vehicleId = '${driver.vehicleId}' WHERE driverId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...driver });
  });
};

// delete

Driver.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM drivers WHERE driverId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Driver;
