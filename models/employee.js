module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "employees",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      employeeNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qualification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      joinedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      qualification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"), // Use ENUM to limit possible values
        allowNull: false, // Set to false if gender is mandatory
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 12,
        max: 12,
      },
      email: {
        type: DataTypes.STRING,
        isEmail: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kebele: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // image: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      salary: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false, // Enable timestamps
      createdAt: "createdAt", // Use 'created_at' as the field name for createdAt
      updatedAt: "updatedAt", // Use 'updated_at' as the field name for updatedAt
    }
  );
  return Employee;
};
