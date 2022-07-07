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
  this.kebele = employee.kebele;
  this.image = employee.image;
  this.bankAccount = employee.bankAccount;
  this.salary = employee.salary;
  this.status = employee.status || "Active";
};

// create new subject
Employee.findAll = (result) => {
  const query = `CALL getEmployees()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Employee.findById = (id, result) => {
  let query = `CALL getEmployeeById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Employee.create = (employee, result) => {
  const {
    departmentId,
    titleId,
    joinedDate,
    qualification,
    totalExperience,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    phoneNumber,
    email,
    country,
    city,
    subCity,
    kebele,
    image,
    bankAccount,
    salary,
    status,
  } = employee;

  mysql.query(
    `CALL createEmployee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      departmentId,
      titleId,
      joinedDate,
      qualification,
      totalExperience,
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      phoneNumber,
      email,
      country,
      city,
      subCity,
      kebele,
      image,
      bankAccount,
      status,
      salary,
    ],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...employee });
    }
  );
};

//update

Employee.findByIdAndUpdate = (id, employee, result) => {
  const {
    departmentId,
    titleId,
    joinedDate,
    qualification,
    totalExperience,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    phoneNumber,
    email,
    country,
    city,
    subCity,
    kebele,
    image,
    bankAccount,
    salary,
  } = employee;

  mysql.query(
    `CALL updateEmployee(${id} ,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?.?,? )`,
    [
      departmentId,
      titleId,
      joinedDate,
      qualification,
      totalExperience,
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      phoneNumber,
      email,
      country,
      city,
      subCity,
      kebele,
      image,
      bankAccount,
      salary,
    ],
    (err, res) => {
      if (err) return result(null, err);

      if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...employee });
    }
  );
};

// delete

Employee.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteEmployee(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Employee;
