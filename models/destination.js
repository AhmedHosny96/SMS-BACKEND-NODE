"use strict";
module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define(
    "destinations",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      startPoint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stopPoint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Active",
      },
    },
    { timestamps: false }
  );

  return Destination;
};

//
