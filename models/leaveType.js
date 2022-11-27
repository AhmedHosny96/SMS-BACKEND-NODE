module.exports = (sequelize, DataTypes) => {
  const LeaveType = sequelize.define(
    "leaveTypes",
    {
      leaveTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      allowedDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return LeaveType;
};
