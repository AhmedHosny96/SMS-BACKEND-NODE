"use strict";

module.exports = (sequelize, DataTypes) => {
  const LeaveRequest = sequelize.define(
    "leaveRequests",
    {
      leaveRequestId: {
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
    { timestamps: false }
  );

  return LeaveRequest;
};

//
