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
  const query = `CALL getNotes()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Note.findById = (id, result) => {
  let query = `CALL getNoteById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};

// create roles

Note.create = (note, result) => {
  const { title, description, attachment, classId, sectionId, subjectId } =
    note;

  mysql.query(
    `call createNote(?,?,?,?,?,?)`,
    [title, description, attachment, classId, sectionId, subjectId],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...note });
    }
  );
};

//update

Note.findByIdAndUpdate = (id, note, result) => {
  const { title, description, attachment, classId, sectionId, subjectId } =
    note;
  mysql.query(
    `CALL updateNote(${id}, ?,?,?,?,?,?)`,
    [title, description, attachment, classId, sectionId, subjectId],
    (err, res) => {
      if (err) return result(null, err);

      if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...note });
    }
  );
};

// delete

Note.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteNote(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Note;
