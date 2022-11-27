module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define(
    "shift",
    {
      shiftId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Shift;
};

//
