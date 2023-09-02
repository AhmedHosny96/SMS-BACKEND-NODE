"use strict";
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    "drivers",
    {
      id: {
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
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: "createdAt", // Use 'created_at' as the field name for createdAt
      updatedAt: "updatedAt", // Use 'updated_at' as the field name for updatedAt
    }
  );

  return Driver;
};

//
