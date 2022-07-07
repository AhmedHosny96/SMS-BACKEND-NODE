const mysql = require("../config/db");

const Class = function (classes) {
  this.classId = classes.classId;
  this.name = classes.name;
  this.description = classes.description;
};

//
Class.findAll = (result) => {
  let query = `CALL getClasses()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};

// by id
Class.findById = (id, result) => {
  let query = ` CALL getClassById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};

Class.create = (data, result) => {
  const { name, description } = data;

  mysql.query(`CALL createClass(? , ?)`, [name, description], (err, res) => {
    if (err) return result(null, err);

    result(null, { id: res.insertId, ...data });
  });
};

//update

Class.findByIdAndUpdate = (id, data, result) => {
  const { name, description } = data;

  // let query = ` , ${[id, name, description]}`;

  mysql.query(
    `CALL updateClass(${id} , ? , ? )`,
    [name, description],
    (err, res) => {
      if (err) return result(null, err);

      // if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...data });
    }
  );
};

// delete

Class.findByIdAndDelete = (id, result) => {
  mysql.query(`CALL deleteClass(${id})`, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Class;
