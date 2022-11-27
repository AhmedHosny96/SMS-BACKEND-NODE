module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "students",
    {
      studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      uniqueId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      joinedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rollNo: {
        type: DataTypes.STRING,
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
        allowNull: true,
        min: 12,
        max: 12,
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
      previousSchoolName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      previousSchoolAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      previousQualification: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    },
    { timestamps: false }
  );
  return Student;
};
