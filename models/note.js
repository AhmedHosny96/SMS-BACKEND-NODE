// const mysql = require("../config/db");

// // constructor

// const Note = function (timetable) {
//   this.title = timetable.title;
//   this.description = timetable.description;
//   this.attachment = timetable.attachment;
//   this.classId = timetable.classId;
//   this.sectionId = timetable.sectionId;
//   this.subjectId = timetable.subjectId;
// };

// //
// module.exports = Note;
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "notes",
    {
      noteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attachment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Note;
};

//
