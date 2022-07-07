const mysql = require("../config/db");

// constructor

const Parent = function (parent) {
  this.parentId = parent.parentId;
  this.fullName = parent.fullName;
  this.phoneNumber = parent.phoneNumber;
  this.email = parent.email;
  this.type = parent.type;
  this.occupation = parent.occupation;
  this.studentId = parent.studentId;
  this.status = parent.status || "Active";
};

// create new subject
Parent.findAll = (result) => {
  const query =
    "SELECT p.parentId , p.fullName , p.status ,  p.phoneNumber , p.email , p.occupation FROM parents p ORDER BY parentId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Parent.findById = (id, result) => {
  let query = `SELECT * FROM parents WHERE parentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Parent.create = (parent, result) => {
  mysql.query("INSERT INTO parents SET ?", parent, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...parent });
  });
};

//update

Parent.findByIdAndUpdate = (id, parent, result) => {
  let query = `UPDATE parents SET fullName = '${parent.fullName}' , phoneNumber = '${parent.phoneNumber}' 
  , email = '${parent.email}' , occupation = '${parent.occupation}' , statusId = '${parent.statusId}' WHERE parentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...parent });
  });
};

// delete

Parent.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM parents WHERE parentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Parent;
