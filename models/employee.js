module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "employees",
    {
      employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      totalExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    },
    { timestamps: false }
  );
  return Employee;
};
