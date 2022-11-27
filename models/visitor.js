"use strict";
module.exports = (sequelize, DataTypes) => {
  const Visitor = sequelize.define(
    "visitors",
    {
      visitorId: {
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
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      toWhom: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Visitor;
};

//
