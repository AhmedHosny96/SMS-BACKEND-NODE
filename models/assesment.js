"use strict";
module.exports = (sequelize, DataTypes) => {
  const Assesment = sequelize.define(
    "assesments",
    {
      assesmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      maxMarks: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Assesment;
};
