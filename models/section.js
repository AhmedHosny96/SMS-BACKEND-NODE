const mysql = require("../config/db");

const Section = function (section) {
  this.name = section.name;
  this.maximumStudents = section.maximumStudents;
  this.classId = section.classId;
};

//
Section.findAll = (result) => {
  let query = `CALL getSections()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};

// by id
Section.findById = (id, result) => {
  let query = `CALL getSectionById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};

Section.create = (section, result) => {
  const { name, maximumStudents, classId } = section;

  mysql.query(
    `CALL createSection(? , ? , ?)`,
    [name, maximumStudents, classId],
    (err, res) => {
      if (err) return result(null, err);

      result(null, { id: res.insertId, ...section });
    }
  );
};

//update

Section.findByIdAndUpdate = (id, section, result) => {
  const { name, maximumStudents, classId } = section;

  mysql.query(
    `CALL updateSection(${id})`,
    [name, maximumStudents, classId],
    (err, res) => {
      if (err) return result(null, err);

      // if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...data });
    }
  );
};

// delete

Section.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteSection(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Section;
