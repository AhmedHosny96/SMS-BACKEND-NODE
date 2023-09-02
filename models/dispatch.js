module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "dispatches",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dispatchDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isParentNotified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true, // Enable timestamps
    }
  );

  return Event;
};
