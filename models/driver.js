"use strict";
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    "drivers",
    {
      driverId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      licenceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    },
    { timestamps: false }
  );

  return Driver;
};

//
