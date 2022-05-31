const mysql = require("../config/db");

// constructor

const Employee = function (teacher) {
  this.departmentId = teacher.departmentId;
  this.titleId = teacher.titleId;
  this.joinedDate = teacher.joinedDate;
  this.qualification = teacher.qualification;
  this.totalExperience = teacher.totalExperience;
  this.firstName = teacher.firstName;
  this.middleName = teacher.middleName;
  this.lastName = teacher.lastName;
  this.dob = teacher.dob;
  this.gender = teacher.gender;
  this.phoneNumber = teacher.phoneNumber;
  this.email = teacher.phoneNumber;
  this.country = teacher.country;
  this.city = teacher.city;
  this.subCity = teacher.subCity;
  this.kebele = teacher.kebele;
  this.image = teacher.image;
  this.bankAccount = teacher.bankAccount;
};

// create new subject
Employee.findAll = (result) => {
  const query = "SELECT * FROM employees ORDER BY employeeId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Employee.findById = (id, result) => {
  let query = `SELECT * FROM employees WHERE employeeId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Employee.create = (employee, result) => {
  mysql.query("INSERT INTO employees SET ?", employee, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...employee });
  });
};

//update

Employee.findByIdAndUpdate = (id, employee, result) => {
  let query = `UPDATE employees SET departmentId = '${employee.departmentId}' , titleId = '${employee.titleId}' , 
  joinedDate = '${employee.joinedDate}' , qualification = '${employee.qualification}' , 
  totalExperience = '${employee.totalExperience}' , firstName = '${employee.firstName}' ,
   middleName = '${employee.middleName}' , lastName = '${employee.lastName}' , 
   dob = '${employee.dob}' , gender = '${employee.gender}' , phoneNumber = '${employee.phoneNumber}' , 
  email = '${employee.email}' , country = '${employee.country}' , 
  city = '${employee.city}' , subCity = '${employee.subCity}' ,  kebele = '${employee.kebele}' , image = '${employee.image}' , 
  bankAccount = '${employee.bankAccount}'  WHERE employeeId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...employee });
  });
};

// delete

Employee.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM employees WHERE employeeId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Employee;
