const mysql = require("../config/db");

// constructor

const Exam = function (exam) {
  this.name = exam.name;
  this.type = exam.type;
  this.termId = exam.termId;
  this.academicId = exam.academicId;
  this.classId = exam.classId;
  this.sectionId = exam.sectionId;
  this.subjectId = exam.subjectId;
  this.maxMarks = exam.maxMarks;
  this.passMarks = exam.passMarks;
  this.date = exam.date;
  this.startTime = exam.startTime;
  this.endTime = exam.endTime;
};

// create new subject
Exam.findAll = (result) => {
  const query = `CALL getExams()`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    result(null, res[0]);
  });
};
// findbyId

Exam.findById = (id, result) => {
  let query = `CALL getExamById(${id})`;

  mysql.query(query, (err, res) => {
    if (err) return result(err, null);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res[0]);
  });
};

// create roles

Exam.create = (exam, result) => {
  const {
    name,
    type,
    date,
    startTime,
    endTime,
    passMarks,
    maxMarks,
    termId,
    academicId,
    classId,
    subjectId,
    sectionId,
  } = exam;
  mysql.query(
    `CALL createExam(?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      name,
      type,
      date,
      startTime,
      endTime,
      passMarks,
      maxMarks,
      termId,
      academicId,
      classId,
      subjectId,
      sectionId,
    ],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      result(null, { id: res.insertId, ...exam });
    }
  );
};

//update

Exam.findByIdAndUpdate = (id, exam, result) => {
  let query = `UPDATE exams SET termId = '${exam.termId}' , academicId = '${exam.academicId}', name = '${exam.name}' ,type = '${exam.type}'
   maxMarks = '${exam.maxMarks}', passMarks = '${exam.passMarks}' ,  date = '${exam.date}', startTime = '${exam.startTime}', endTime = '${exam.endTime}',  
   classId = '${exam.classId}' , sectionId = '${exam.sectionId}' , subjectId = '${exam.subjectId}' WHERE examId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.length == 0) return result({ kind: "not_found" }, null);

    result(null, { ...exam });
  });
};

// delete

Exam.findByIdAndDelete = (id, result) => {
  let query = `DELETE FROM exams WHERE examId = '${id}'`;

  mysql.query(query, (err, res) => {
    if (err) return result(null, err);

    if (res.affectedRows == 0) return result({ kind: "not_found" }, null);

    result(null, res);
  });
};

module.exports = Exam;
