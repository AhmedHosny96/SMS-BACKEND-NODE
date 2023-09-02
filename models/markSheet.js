"use strict";

module.exports = (sequelize, DataTypes) => {
  const studentMarks = sequelize.define("studentMarks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marksObtained: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return studentMarks;
};
