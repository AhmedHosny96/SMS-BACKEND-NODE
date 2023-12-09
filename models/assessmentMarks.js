"use strict";
module.exports = (sequelize, DataTypes) => {
  const Assesment = sequelize.define(
    "AssessmentMarks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: "createdAt", // Custom field name for createdAt
      updatedAt: "updatedAt", // Custom field name for updatedAt
    }
  );

  return Assesment;
};
