// const mysql = require("../config/db");

// // constructor

// const Event = function (event) {
//   this.eventType = event.eventType;
//   this.eventFor = event.eventFor;
//   this.fromDate = event.fromDate;
//   this.toDate = event.toDate;
//   this.description = event.description;
//   //   this.roleId = event.roleId;
//   //   this.classId = event.classId;
// };

// //

// module.exports = Event;

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "events",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Upcoming",
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: "createdAt", // Use 'created_at' as the field name for createdAt
      updatedAt: "updatedAt", // Use 'updated_at' as the field name for updatedAt
    }
  );

  return Event;
};
