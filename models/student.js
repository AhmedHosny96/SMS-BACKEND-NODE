const mysql = require("../config/db");

// constructor

const Student = function (teacher) {
  this.academicId = teacher.academicId;
  this.uniqueId = teacher.uniqueId;
  this.joinedDate = teacher.joinedDate;
  this.classId = teacher.classId;
  this.sectionId = teacher.sectionId;
  this.rollNo = teacher.rollNo;
  this.firstName = teacher.firstName;
  this.middleName = teacher.middleName;
  this.lastName = teacher.lastName;
  this.dob = teacher.dob;
  this.gender = teacher.gender;
  this.birthPlace = teacher.birthPlace;
  this.nationality = teacher.nationality;
  this.country = teacher.country;
  this.city = teacher.city;
  this.district = teacher.district;
  this.kebele = teacher.kebele;
  this.phone = teacher.phone;
  this.previousSchoolName = teacher.previousSchoolName;
  this.previousSchoolAddress = teacher.previousSchoolAddress;
  this.previousQualification = teacher.previousQualification;
};

// create new subject
Student.findAll = (result) => {
  const query = "SELECT * FROM students ORDER BY studentId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Student.findById = (id, result) => {
  let query = `SELECT * FROM students WHERE studentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Student.create = (parent, result) => {
  mysql.query("INSERT INTO students SET ?", parent, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...parent });
  });
};

//update

Student.findByIdAndUpdate = (id, teacher, result) => {
  let query = `UPDATE students SET academicId = '${teacher.academicId}' , uniqueId = '${teacher.uniqueId}' , 
  joinedDate = '${teacher.joinedDate}' , classId = '${teacher.classId}' , 
  sectionId = '${teacher.sectionId}' , rollNo = '${teacher.rollNo}' , 
  firstName = '${teacher.firstName}' , middleName = '${teacher.middleName}' , 
  lastName = '${teacher.lastName}' , dob = '${teacher.dob}' , gender = '${teacher.gender}' , birthPlace = '${teacher.birthPlace}' , 
  nationality = '${teacher.nationality}' , country = '${teacher.country}' , 
  city = '${teacher.city}' , district = '${teacher.district}' ,  kebele = '${teacher.kebele}' , phone = '${teacher.phone}' , 
  previousSchoolName = '${teacher.previousSchoolName}' , previosSchoolAddress = '${teacher.previosSchoolAddress}' , 
  previousSchoolQualification = '${teacher.previousSchoolQualification}'  WHERE studentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...teacher });
  });
};

// delete

Student.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM students WHERE studentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Student;
