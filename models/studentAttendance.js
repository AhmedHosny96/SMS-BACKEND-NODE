module.exports = (sequelize, DataTypes) => {
  const StudentAttendance = sequelize.define("studentAttendance", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    attendanceDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Present", "Absent", "Permitted"),
      allowNull: false,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hasLeftHome: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value indicating the student hasn't left home
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return StudentAttendance;
};

//
