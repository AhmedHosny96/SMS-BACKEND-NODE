const mysql = require("../config/db");

// constructor

const Note = function (timetable) {
  this.title = timetable.title;
  this.description = timetable.description;
  this.attachment = timetable.attachment;
  this.classId = timetable.classId;
  this.sectionId = timetable.sectionId;
  this.subjectId = timetable.subjectId;
};

// create new subject
Note.findAll = (result) => {
  const query = "SELECT * FROM notes ORDER BY noteId ASC ";

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

Note.findById = (id, result) => {
  let query = `SELECT * FROM notes WHERE noteId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

Note.create = (note, result) => {
  mysql.query("INSERT INTO notes SET ?", note, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, { id: res.insertId, ...note });
  });
};

//update

Note.findByIdAndUpdate = (id, note, result) => {
  let query = `UPDATE notes SET title = '${note.title}' , description = '${note.description}' ,  attachment = '${note.attachment}', classId = '${note.classId}' 
  ,sectionId = '${note.sectionId}' ,subjectId = '${note.subjectId}' WHERE noteId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...note });
  });
};

// delete

Note.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM notes WHERE noteId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Note;
