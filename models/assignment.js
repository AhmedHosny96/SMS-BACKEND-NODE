const mysql = require("../config/db");

// constructor

const Assignment = function (assignment) {
  this.title = assignment.title;
  this.type = assignment.type;
  this.date = assignment.date;
  this.description = assignment.description;
  this.attachment = assignment.attachment;
  this.dueDate = assignment.dueDate;
  this.classId = assignment.classId;
  this.subjectId = assignment.subjectId;
  this.sectionId = assignment.sectionId;
};

// create new subject
Assignment.findAll = (result) => {
  const query = `CALL getAssigments()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Assignment.findById = (id, result) => {
  let query = `CALL getAssignmentById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Assignment.create = (assignment, result) => {
  const {
    title,
    type,
    date,
    description,
    dueDate,
    attachment,
    subjectId,
    sectionId,
    classId,
  } = assignment;
  mysql.query(
    `CALL createAssignment(?,?,?,?,?,?,?,?,?)`,
    [
      title,
      type,
      date,
      description,
      dueDate,
      attachment,
      subjectId,
      sectionId,
      classId,
    ],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...assignment });
    }
  );
};

//update

Assignment.findByIdAndUpdate = (id, assignment, result) => {
  const {
    title,
    type,
    date,
    description,
    dueDate,
    attachment,
    subjectId,
    sectionId,
    classId,
  } = assignment;

  mysql.query(
    `CALL updateAssignment(${id},?,?,?,?,?,?,?,?,?)`,
    [
      title,
      type,
      date,
      description,
      dueDate,
      attachment,
      subjectId,
      sectionId,
      classId,
    ],
    (err, res) => {
      if (err) return result(null, err);

      if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...assignment });
    }
  );
};

// delete

Assignment.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteAssignment(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Assignment;
