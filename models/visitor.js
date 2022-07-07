const mysql = require("../config/db");

// constructor

const Visitor = function (visitor) {
  this.name = visitor.name;
  this.contact = visitor.contact;
  this.toWhom = visitor.toWhom;
  this.date = visitor.date;
  this.reason = visitor.reason;
};

// create new subject
Visitor.findAll = (result) => {
  const query = `CALL getVisitors()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Visitor.findById = (id, result) => {
  let query = `CALL getVisitorById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};

// create roles

Visitor.create = (visitor, result) => {
  const { name, contact, toWhom, reason, date } = visitor;
  mysql.query(
    `CALL createVisitor(?,?,?,?,?)`,
    [name, contact, toWhom, reason, date],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...visitor });
    }
  );
};

//update

Visitor.findByIdAndUpdate = (id, visitor, result) => {
  const { name, contact, toWhom, reason, date } = visitor;

  mysql.query(
    `CALL updateVisitor(${id},?,?,?,?,?)`,
    [name, contact, toWhom, reason, date],
    (err, res) => {
      if (err) return result(null, err);

      if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...visitor });
    }
  );
};

// delete

Visitor.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteVisitor(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Visitor;
