const mysql = require("../config/db");

const VehicleType = function (vehicleType) {
  this.type = vehicleType.type;
};

// fi
module.exports = VehicleType;
