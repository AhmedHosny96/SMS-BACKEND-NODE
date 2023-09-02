module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
    "Section",
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
        // unique: true,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: "createdAt", // Use 'created_at' as the field name for createdAt
      updatedAt: "updatedAt", // Use 'updated_at' as the field name for updatedAt
    }
  );

  return Section;
};

//
