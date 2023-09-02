"use strict";
module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define(
    "exams",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      maxMarks: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passMarks: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Exam;
};

// module.exports = Exam;
