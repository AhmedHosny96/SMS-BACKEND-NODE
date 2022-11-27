module.exports = (sequelize, DataTypes) => {
  const Term = sequelize.define(
    "term",
    {
      termId: {
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
      ethiopianDate: {
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

  return Term;
};
