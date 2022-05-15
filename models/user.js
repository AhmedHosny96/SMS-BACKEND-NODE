const mysql = require("../config/db");

const User = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.roleId = user.roleId;
};

User.findAll = (result) => {
  const query = "SELECT * FROM users";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err.message);

    result(null, res);
  });
};
// find one

User.findOne = (email, result) => {
  mysql.query("SELECT * FROM users WHERE email=?", email, (err, res) => {
    if (err) {
      return result(err.message, null);
    }

    result(null, res);
  });
};

// find by id
User.findById = (id, result) => {
  let query = `SELECT * FROM users WHERE userId = '${id}'`;
  mysql.query(query, id, (err, res) => {
    if (err) return result(err.message, null);

    result(null, res);
  });
};

module.exports = User;
