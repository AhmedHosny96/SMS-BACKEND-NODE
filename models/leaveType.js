module.exports = (sequelize, DataTypes) => {
  const LeaveType = sequelize.define(
    "leaveTypes",
    {
      id: {
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: "createdAt", // Use 'created_at' as the field name for createdAt
      updatedAt: "updatedAt", // Use 'updated_at' as the field name for updatedAt
    }
  );

  return LeaveType;
};
