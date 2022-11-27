"use strict";
const { Section } = require("./section");
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      classId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  // Class.hasMany(Section, {
  //   foreignKey: "classId",
  // });

  return Class;
};

//
