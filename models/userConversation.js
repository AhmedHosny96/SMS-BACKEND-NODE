module.exports = (sequelize, DataTypes) => {
  const UserConversation = sequelize.define(
    "UserConversation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return UserConversation;
};
