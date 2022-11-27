module.exports = (sequelize, DataTypes) => {
  const AcademicYear = sequelize.define(
    "academicYear",
    {
      academicYearId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ethiopianYear: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
        validate: {
          isDate: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    },
    { timestamps: false }
  );

  return AcademicYear;
};
