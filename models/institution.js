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


module.exports = Institution;
