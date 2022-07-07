const mysql = require("../config/db");

// constructor

const Driver = function (driver) {
  this.driverId = driver.driverId;
  this.fullName = driver.fullName;
  this.phoneNumber = driver.phoneNumber;
  this.licenceNumber = driver.licenceNumber;
  this.dob = driver.dob;
  this.status = driver.status;
  this.vehicleId = driver.vehicleId;
};

// create new subject
Driver.findAll = (result) => {
  const query = `CALL getDrivers()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Driver.findById = (id, result) => {
  let query = `CALL getDriverById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Driver.create = (driver, result) => {
  const { fullName, phoneNumber, licenceNumber, dob, vehicleId } = driver;
  mysql.query(
    `CALL createDriver(? , ? , ? , ? , ?)`,
    [fullName, phoneNumber, licenceNumber, dob, vehicleId],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...driver });
    }
  );
};

//update

Driver.findByIdAndUpdate = (id, driver, result) => {
  const { fullName, phoneNumber, licenceNumber, dob, vehicleId, status } =
    driver;
  mysql.query(
    `CALL updateDriver(${id} , ? , ? , ? , ? , ? , ?)`,
    [fullName, phoneNumber, licenceNumber, dob, vehicleId, status],
    (err, res) => {
      if (err) return result(null, err);

      // if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...driver });
    }
  );
};

// delete

Driver.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteDriver(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Driver;
