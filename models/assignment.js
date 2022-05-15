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
  const query = "SELECT * FROM assignments ORDER BY assignmentId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Assignment.findById = (id, result) => {
  let query = `SELECT * FROM assignments WHERE assignmentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Assignment.create = (assignment, result) => {
  mysql.query("INSERT INTO assignments SET ?", assignment, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...assignment });
  });
};

//update

Assignment.findByIdAndUpdate = (id, assignment, result) => {
  let query = `UPDATE assignments SET title = '${assignment.title}' , type = '${assignment.type}', description = '${assignment.description}' , date = '${assignment.date}', dueDate = '${assignment.dueDate}' ,  attachment = '${assignment.attachment}', classId = '${assignment.classId}' 
  ,sectionId = '${assignment.sectionId}' ,subjectId = '${assignment.subjectId}' WHERE assignmentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...assignment });
  });
};

// delete

Assignment.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM assignments WHERE assignmentId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Assignment;
