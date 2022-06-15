const mysql = require("../config/db");

const Section = function (section) {
  this.name = section.name;
  this.maximumStudents = section.maximumStudents;
  this.classId = section.classId;
};

//
Section.findAll = (result) => {
  let query = `SELECT s.sectionId , s.name , s.maximumStudents  , c.name AS class FROM sections s  JOIN classes c ON 
  s.classId AND c.classId 
  `;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};

// by id
Section.findById = (id, result) => {
  let query = `SELECT id , classId , maximumStudents FROM sections WHERE sectionId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};

Section.create = (section, result) => {
  mysql.query(`INSERT INTO sections SET ?`, section, (err, res) => {
    if (err) return result(null, err);

    result(null, { id: res.insertId, ...section });
  });
};

//update

Section.findByIdAndUpdate = (id, section, result) => {
  let query = `UPDATE sections SET name = '${section.name}'  , maximumStudents = '${section.maximumStudents}' , class_id = '${section.calssId}' WHERE sectionId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    // if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...data });
  });
};

// delete

Section.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM sections WHERE sectionId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Section;
