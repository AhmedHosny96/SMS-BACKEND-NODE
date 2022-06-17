const mysql = require("../config/db");

// constructor

const Employee = function (employee) {
  this.departmentId = employee.departmentId;
  this.titleId = employee.titleId;
  this.joinedDate = employee.joinedDate;
  this.qualification = employee.qualification;
  this.totalExperience = employee.totalExperience;
  this.firstName = employee.firstName;
  this.middleName = employee.middleName;
  this.lastName = employee.lastName;
  this.dob = employee.dob;
  this.gender = employee.gender;
  this.phoneNumber = employee.phoneNumber;
  this.email = employee.email;
  this.country = employee.country;
  this.city = employee.city;
  this.subCity = employee.subCity;
  // this.kebele = employee.kebele;
  this.image = employee.image;
  // this.bankAccount = employee.bankAccount;
};

// create new subject
Employee.findAll = (result) => {
  const query = `SELECT e.employeeId , concat (e.firstName , ' ' , e.middleName , ' ', e.lastName)  AS fullName ,   e.email , e.phoneNumber  , j.name AS jobTitle , d.name AS department
     FROM employees e INNER JOIN departments d ON e.departmentId = d.departmentId INNER JOIN jobTitles j ON e.titleId = j.titleId
     ORDER BY employeeId ASC`;

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
