module.exports = (sequelize, DataTypes) => {
  const StudentFee = sequelize.define(
    "studentFee",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "students", // Assuming you have a "students" table
          key: "id",
        },
      },
      feeMonth: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentMode: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      receiptNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: "studentsFee", // Specify the actual table name if different from the model name
      timestamps: false, // If you don't need createdAt and updatedAt columns
    }
  );
  return StudentFee;
};
