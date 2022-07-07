const mysql = require("../config/db");

const User = require("../models/user");

const Auth = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.roleId = user.roleId;
  this.status = user.status;
};

// create user

Auth.create = (user, result) => {
  const { username, email, password, roleId } = user;
  mysql.query(
    "CALL createUser(?,?,?,?)",
    [username, email, password, roleId],
    (err, res) => {
      if (err) {
        return result(err, null);
      }
      result(null, { id: res.insertId, ...user });
    }
  );
};

module.exports = Auth;
