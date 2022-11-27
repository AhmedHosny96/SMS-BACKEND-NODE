const mysql = require("../config/db");

// const User = function (user) {
//   this.username = user.username;
//   this.email = user.email;
//   this.password = user.password;
//   this.roleId = user.roleId;
// };

// module.exports = User;
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
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
  return User;
};
