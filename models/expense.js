module.exports = (sequelize, DataTypes) => {
  const Expenses = sequelize.define(
    "expenses",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
    },

    {
      timestamps: false, // Enable timestamps
      createdAt: "createdAt", // Use 'created_at' as the field name for createdAt
      updatedAt: "updatedAt", // Use 'updated_at' as the field name for updatedAt
      hooks: {
        beforeSave: (instance) => {
          if (instance.quantity && instance.amount) {
            instance.total = instance.quantity * instance.amount;
          }
        },
      },
    }
  );

  return Expenses;
};
