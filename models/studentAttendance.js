module.exports = (sequelize, DataTypes) => {
  const StudentAttendance = sequelize.define(
    "studentAttendance",
    {
      studentAttendanceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return StudentAttendance;
};

//
