"use strict";
module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define(
    "destinations",
    {
      destinationId: {
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
    },
    { timestamps: false }
  );

  return Destination;
};

//
