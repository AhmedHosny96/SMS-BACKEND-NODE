const mysql = require("../config/db");

// constructor

const StudentDocument = function (document) {
  this.type = document.type;
  this.description = document.description;
  this.attachment = document.attachment;
  this.studentId = document.studentId;
};

// create new subject
StudentDocument.findAll = (result) => {
  const query = `CALL getStudentDocuments()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res);
  });
};
// findbyId

StudentDocument.findById = (id, result) => {
  let query = `CALL getStudentDocumentById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

// create roles

StudentDocument.create = (document, result) => {
  const { type, description, attachment, studentId } = document;

  mysql.query(
    `CALL createStudentDocument(?,?,?,?)`,
    [type, description, attachment, studentId],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...document });
    }
  );
};

//update

StudentDocument.findByIdAndUpdate = (id, document, result) => {
  const { type, description, attachment, studentId } = document;

  mysql.query(
    `CALL updateStudentDocument(${id},?,?,?,?)`,
    [type, description, attachment, studentId],
    (err, res) => {
      if (err) return result(null, err);

      if (res.length == 0) return result({ kind: "not_found" }, null);

      result(null, { ...document });
    }
  );
};

// delete

StudentDocument.findByIdAndDelete = (id, result) => {
  let query = `CALL deleteStudentDocument(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = StudentDocument;
