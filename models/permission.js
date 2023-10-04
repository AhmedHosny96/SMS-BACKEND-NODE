module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "permissions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      permission: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      category: {
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
  return Role;
};
