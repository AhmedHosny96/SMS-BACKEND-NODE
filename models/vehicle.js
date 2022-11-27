// const mysql = require("../config/db");

// // constructor

// const Vehicle = function (vehicle) {
//   this.vehicleId = vehicle.vehicleId;
//   this.ownerName = vehicle.ownerName;
//   this.ownerPhoneNumber = vehicle.ownerPhoneNumber;
//   this.plateNumber = vehicle.plateNumber;
//   this.noOfSeats = vehicle.noOfSeats;
//   this.maximumStudents = vehicle.maximumStudents;
//   this.rentedAmount = vehicle.rentedAmount;
//   this.type = vehicle.type;
// };

// module.exports = Vehicle;

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    "vehicles",
    {
      vehicleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      ownerName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ownerPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      plateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rentedAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { timestamps: false }
  );

  return Vehicle;
};

//
