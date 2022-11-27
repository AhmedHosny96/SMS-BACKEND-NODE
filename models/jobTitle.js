module.exports = (sequelize, DataTypes) => {
  const Jobtitle = sequelize.define(
    "jobtitles",
    {
      titleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false }
  );
  return Jobtitle;
};
