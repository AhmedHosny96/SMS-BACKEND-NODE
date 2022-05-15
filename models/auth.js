const mysql = require("../config/db");

const User = require("../models/user");

const Auth = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.roleId = user.roleId;
};

// create user

Auth.create = (user, result) => {
  //   const query =  + user;

  mysql.query("INSERT INTO users SET ?", user, (err, res) => {
    if (err) {
      return result(err, null);
    }
    result(null, { id: res.insertId, ...user });
  });
};

module.exports = Auth;
