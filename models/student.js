const mysql = require("../config/db");

// constructor

const Student = function (student) {
  this.academicId = student.academicId;
  this.uniqueId = student.uniqueId;
  this.joinedDate = student.joinedDate;
  this.classId = student.classId;
  this.sectionId = student.sectionId;
  this.rollNo = student.rollNo;
  this.firstName = student.firstName;
  this.middleName = student.middleName;
  this.lastName = student.lastName;
  this.dob = student.dob;
  this.gender = student.gender;
  this.birthPlace = student.birthPlace;
  this.nationality = student.nationality;
  this.country = student.country;
  this.city = student.city;
  this.subCity = student.subCity;
  this.kebele = student.kebele;
  this.phone = student.phone;
  this.image = student.image;
  this.previousSchoolName = student.previousSchoolName;
  this.previousSchoolAddress = student.previousSchoolAddress;
  this.previousQualification = student.previousQualification;
  this.status = student.status || "Active";
};

// create new subject
Student.findAll = (result) => {
  const query = `CALL getStudents()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Student.findById = (id, result) => {
  let query = `CALL getStudentById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};

// create roles

Student.create = (student, result) => {
  const {
    academicId,
    uniqueId,
    joinedDate,
    classId,
    sectionId,
    rollNo,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    birthPlace,
    nationality,
    country,
    city,
    subCity,
    kebele,
    phone,
    previousSchoolName,
    previosSchoolAddress,
    previousQualification,
    image,
  } = student;
  mysql.query(
    `CALL createStudent(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      academicId,
      uniqueId,
      joinedDate,
      classId,
      sectionId,
      rollNo,
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      birthPlace,
      nationality,
      country,
      city,
      subCity,
      kebele,
      phone,
      previousSchoolName,
      previosSchoolAddress,
      previousQualification,
      image,
    ],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...student });
    }
  );
};

//update

Student.findByIdAndUpdate = (id, teacher, result) => {
  const {
    academicId,
    uniqueId,
    joinedDate,
    classId,
    sectionId,
    rollNo,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    birthPlace,
    nationality,
    country,
    city,
    subCity,
    kebele,
    phone,
    previousSchoolName,
    previosSchoolAddress,
    previousQualification,
    image,
  } = student;
  mysql.query(
    `CALL updateStudent(${id} ,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )`,
    [
      academicId,
      uniqueId,
      joinedDate,
      classId,
      sectionId,
      rollNo,
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      birthPlace,
      nationality,
      country,
      city,
      subCity,
      kebele,
      phone,
      previousSchoolName,
      previosSchoolAddress,
      previousQualification,
      image,
    ],
    (err, res) => {
      if (err) return result(null, err);

      if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...teacher });
    }
  );
};

// delete

Student.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteStudent(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Student;
