module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "departments",
    {
      departmentId: {
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
    },
    { timestamps: false }
  );

  return Department;
};
