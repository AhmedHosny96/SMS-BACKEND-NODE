"use strict";

module.exports = (sequelize, DataTypes) => {
  const LeaveRequest = sequelize.define(
    "leaveRequests",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      fromDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
      },
      toDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: "createdAt", // Use 'created_at' as the field name for createdAt
      updatedAt: "updatedAt", // Use 'updated_at' as the field name for updatedAt
    }
  );

  return LeaveRequest;
};

//
