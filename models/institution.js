const mysql = require("../config/db");

// constructor

const Institution = function (institution) {
  this.institutionId = institution.institutionId;
  this.name = institution.name;
  this.code = institution.code;
  this.email = institution.email;
  this.telephone = institution.telephone;
  this.phoneNumber = institution.phoneNumber;
  this.location = institution.location;
  this.logo = institution.logo;
};

// create new subject
Institution.findAll = (result) => {
  const query = "SELECT * FROM institution ORDER BY institutionId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Institution.findById = (id, result) => {
  let query = `SELECT * FROM institution WHERE institutionId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Institution.create = (institution, result) => {
  mysql.query("INSERT INTO institution SET ?", institution, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...institution });
  });
};

//update

Institution.findByIdAndUpdate = (id, institution, result) => {
  let query = `UPDATE institution SET name = '${institution.name}', code = '${institution.code}' ,
  , email = '${institution.email}' , telephone = '${institution.telephone}'
  , phoneNumber = '${institution.phoneNumber}' ,  location = '${institution.location}' 
  , logo = '${institution.logo}'  WHERE institutionId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...institution });
  });
};

// delete

Institution.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM institution WHERE institutionId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Institution;
