module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
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

  return Class;
};

//
