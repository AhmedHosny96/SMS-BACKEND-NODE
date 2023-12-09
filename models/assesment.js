"use strict";
module.exports = (sequelize, DataTypes) => {
  const Assesment = sequelize.define(
    "Assessment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING, // Example: Exam, Quiz, Assignment
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      maxMarks: {
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
