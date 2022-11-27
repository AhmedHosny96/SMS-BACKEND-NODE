"use strict";
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "assets",
    {
      assetId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ok",
      },
    },
    { timestamps: false }
  );

  return Asset;
};

//
