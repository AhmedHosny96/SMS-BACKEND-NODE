"use strict";

const config = require("../config/db");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { Sequelize, DataTypes } = require("sequelize");

const db = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to db"))
  .catch((error) => console.log("Failed to connect to db", error));

// MODELS

db.subjects = require("./subject")(sequelize, DataTypes);
db.classes = require("./class")(sequelize, DataTypes);
db.sections = require("./section")(sequelize, DataTypes);
db.academicYear = require("./academicYear")(sequelize, DataTypes);
db.assets = require("./asset")(sequelize, DataTypes);
db.departments = require("./deparment")(sequelize, DataTypes);
db.jobtitles = require("./jobTitle")(sequelize, DataTypes);
db.employees = require("./employee")(sequelize, DataTypes);
db.leaveTypes = require("./leaveType")(sequelize, DataTypes);
db.assesments = require("./assesment")(sequelize, DataTypes);
db.leaveTypes = require("./leaveType")(sequelize, DataTypes);
db.leaveRequests = require("./leaveRequest")(sequelize, DataTypes);
db.terms = require("./term")(sequelize, DataTypes);
db.exams = require("./exam")(sequelize, DataTypes);
db.periods = require("./period")(sequelize, DataTypes);
db.shifts = require("./shift")(sequelize, DataTypes);
db.vehicles = require("./vehicle")(sequelize, DataTypes);
db.drivers = require("./driver")(sequelize, DataTypes);
db.notes = require("./note")(sequelize, DataTypes);
db.destinations = require("./destination")(sequelize, DataTypes);
db.students = require("./student")(sequelize, DataTypes);
db.newsfeed = require("./newsFeed")(sequelize, DataTypes);
db.roles = require("./role")(sequelize, DataTypes);
db.users = require("./user")(sequelize, DataTypes);
db.assignments = require("./assignment")(sequelize, DataTypes);
db.studentAttendance = require("./studentAttendance")(sequelize, DataTypes);
db.visitor = require("./visitor")(sequelize, DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

// fs.readdirSync(__dirname)
//     .filter((file) => {
//         return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
//     })
//     .forEach((file) => {
//         const model = sequelize['import'](path.join(__dirname, file));
//         db[model.name] = model;
//     });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// MODEL RELATIONSHIPS

db.classes.hasMany(db.sections, {
  foreignKey: "classId",
});

db.sections.belongsTo(db.classes, {
  foreignKey: "classId",
});

db.assesments.belongsTo(db.classes, { foreignKey: "classId" });
db.assesments.belongsTo(db.sections, { foreignKey: "sectionId" });
db.assesments.belongsTo(db.subjects, { foreignKey: "subjectId" });

db.employees.belongsTo(db.jobtitles, { foreignKey: "titleId" });
db.employees.belongsTo(db.departments, { foreignKey: "departmentId" });

db.leaveRequests.belongsTo(db.leaveTypes, { foreignKey: "leaveTypeId" });
db.leaveRequests.belongsTo(db.employees, { foreignKey: "employeeId" });

db.terms.belongsTo(db.academicYear, { foreignKey: "academicYearId" });

db.exams.belongsTo(db.academicYear, { foreignKey: "academicYearId" });
db.exams.belongsTo(db.terms, { foreignKey: "termId" });
db.exams.belongsTo(db.classes, { foreignKey: "classId" });
db.exams.belongsTo(db.sections, { foreignKey: "sectionId" });
db.exams.belongsTo(db.subjects, { foreignKey: "subjectId" });

db.drivers.belongsTo(db.vehicles, { foreignKey: "vehicleId" });

db.notes.belongsTo(db.classes, { foreignKey: "classId" });
db.notes.belongsTo(db.sections, { foreignKey: "sectionId" });
db.notes.belongsTo(db.subjects, { foreignKey: "subjectId" });

db.destinations.belongsTo(db.vehicles, { foreignKey: "vehicleId" });
db.destinations.belongsTo(db.drivers, { foreignKey: "driverId" });

db.students.belongsTo(db.academicYear, { foreignKey: "academicYearId" });
db.students.belongsTo(db.classes, { foreignKey: "classId" });
db.students.belongsTo(db.sections, { foreignKey: "sectionId" });

db.users.belongsTo(db.roles, { foreignKey: "roleId" });

db.assignments.belongsTo(db.classes, { foreignKey: "classId" });
db.assignments.belongsTo(db.sections, { foreignKey: "sectionId" });
db.assignments.belongsTo(db.subjects, { foreignKey: "subjectId" });

db.studentAttendance.belongsTo(db.periods, { foreignKey: "periodId" });
db.studentAttendance.belongsTo(db.students, { foreignKey: "studentId" });

module.exports = db;
