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

sequelize.options.logging = false;

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
// db.notes = require("./note")(sequelize, DataTypes);
db.destinations = require("./destination")(sequelize, DataTypes);
db.students = require("./student")(sequelize, DataTypes);
// db.newsfeed = require("./newsFeed")(sequelize, DataTypes);
db.roles = require("./role")(sequelize, DataTypes);
db.users = require("./user")(sequelize, DataTypes);
db.assignments = require("./assignment")(sequelize, DataTypes);
db.studentAttendance = require("./studentAttendance")(sequelize, DataTypes);
db.studentFee = require("./studentFee")(sequelize, DataTypes);
db.parents = require("./parent")(sequelize, DataTypes);
db.studentMarks = require("./markSheet")(sequelize, DataTypes);
db.timetable = require("./timetable")(sequelize, DataTypes);
db.permissions = require("./permission")(sequelize, DataTypes);
db.rolepermissions = require("./rolePermission")(sequelize, DataTypes);
db.expenses = require("./expense")(sequelize, DataTypes);
db.school = require("./school")(sequelize, DataTypes);
db.schoolBranch = require("./schoolBranch")(sequelize, DataTypes);
db.classRoom = require("./classRoom")(sequelize, DataTypes);
db.events = require("./event")(sequelize, DataTypes);

db.messages = require("./message")(sequelize, DataTypes);

db.tasks = require("./task")(sequelize, DataTypes);
db.conversations = require("./conversation")(sequelize, DataTypes);
db.userConversation = require("./userConversation")(sequelize, DataTypes);

db.dispatches = require("./dispatch")(sequelize, DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false }).then(() => {
  // console.log("yes re-sync done");
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

// db.assesments.belongsTo(db.classes, { foreignKey: "id" });
// db.assesments.belongsTo(db.sections, { foreignKey: "id" });
// db.assesments.belongsTo(db.subjects, { foreignKey: "id" });

db.employees.belongsTo(db.roles, { foreignKey: "roleId" });
db.roles.hasMany(db.employees, { foreignKey: "roleId" });
db.employees.belongsTo(db.departments, { foreignKey: "departmentId" });

// db.leaveRequests.belongsTo(db.leaveTypes, { foreignKey: "id" });
// db.leaveRequests.belongsTo(db.employees, { foreignKey: "id" });

db.terms.belongsTo(db.academicYear, { foreignKey: "id" });

// db.exams.belongsTo(db.academicYear, { foreignKey: "id" });
// db.exams.belongsTo(db.terms, { foreignKey: "termId" });
// db.exams.belongsTo(db.classes, { foreignKey: "id" });
// db.exams.belongsTo(db.sections, { foreignKey: "id" });
// db.exams.belongsTo(db.subjects, { foreignKey: "id" });

db.drivers.belongsTo(db.vehicles, { as: "vehicle", foreignKey: "id" });

// db.notes.belongsTo(db.classes, { foreignKey: "id" });
// db.notes.belongsTo(db.sections, { foreignKey: "id" });
// db.notes.belongsTo(db.subjects, { foreignKey: "id" });

// db.destinations.belongsTo(db.vehicles, { foreignKey: "id" });
// db.destinations.belongsTo(db.drivers, { foreignKey: "id" });

db.students.belongsTo(db.academicYear, { foreignKey: "academicYearId" });
db.students.belongsTo(db.classes, { foreignKey: "classId" });
db.students.belongsTo(db.sections, { foreignKey: "sectionId" });
db.users.belongsTo(db.roles, { foreignKey: "roleId" });

// db.assignments.belongsTo(db.classes, { foreignKey: "id" });
// db.assignments.belongsTo(db.sections, { foreignKey: "id" });
// db.assignments.belongsTo(db.subjects, { foreignKey: "id" });

db.studentAttendance.belongsTo(db.students, { foreignKey: "studentId" });

db.parents.hasMany(db.students, { foreignKey: "parentId" });

db.students.belongsTo(db.parents, { foreignKey: "parentId" });

db.parents.belongsTo(db.roles, { foreignKey: "roleId" });

db.studentFee.belongsTo(db.students, { foreignKey: "studentId" });
db.students.hasMany(db.studentFee, { foreignKey: "studentId" });

db.studentMarks.belongsTo(db.students, { foreignKey: "studentId" });
db.studentMarks.belongsTo(db.subjects, { foreignKey: "subjectId" });

db.students.hasMany(db.studentMarks, { foreignKey: "studentId" });
// db.subjects.hasMany(db.timetable, { foreignKey: "subjectId" });
// db.classes.hasMany(db.timetable, { foreignKey: "classId" });
// db.sections.hasMany(db.timetable, { foreignKey: "sectionId" });

db.classes.hasMany(db.sections, { foreignKey: "classId" });
db.sections.belongsTo(db.classes, { foreignKey: "classId" });

db.timetable.belongsTo(db.subjects, {
  foreignKey: "subjectId",
  // as: "subject",
});

db.timetable.belongsTo(db.sections, {
  foreignKey: "sectionId",
  // as: "section",
});
db.timetable.belongsTo(db.classes, {
  foreignKey: "classId",
  // as: "section",
});

// db.permissions.belongsToMany(db.roles, { through: "RolePermission" });

// db.roles.belongsToMany(db.permissions, { through: "RolePermission" });

db.rolepermissions.belongsTo(db.roles, { foreignKey: "roleId" });
db.rolepermissions.belongsTo(db.permissions, {
  foreignKey: "permissionId",
});

db.roles.belongsToMany(db.permissions, { through: "rolePermission" });

db.leaveRequests.belongsTo(db.employees, { foreignKey: "employeeId" });

db.leaveRequests.belongsTo(db.leaveTypes, { foreignKey: "leaveTypeId" });

db.schoolBranch.belongsTo(db.school, { foreignKey: "schoolId" });

db.classRoom.belongsTo(db.classes, { foreignKey: "classId" });
db.classRoom.belongsTo(db.sections, { foreignKey: "sectionId" });

db.tasks.belongsTo(db.users, { foreignKey: "userId" });

db.messages.belongsTo(db.users, { as: "sender", foreignKey: "senderId" });
db.messages.belongsTo(db.users, { as: "receiver", foreignKey: "receiverId" });
db.messages.belongsTo(db.conversations, { foreignKey: "conversationId" }); // Associate with Conversation
db.conversations.hasMany(db.messages, { foreignKey: "conversationId" });
db.conversations.belongsToMany(db.users, { through: "UserConversation" });

db.users.hasMany(db.messages, { as: "sentMessages", foreignKey: "senderId" });
db.users.hasMany(db.messages, {
  as: "receivedMessages",
  foreignKey: "receiverId",
});
db.conversations.hasMany(db.messages, { foreignKey: "conversationId" });

db.students.belongsTo(db.destinations, { foreignKey: "destinationId" });

db.dispatches.belongsTo(db.destinations, { foreignKey: "destinationId" });
db.dispatches.belongsTo(db.drivers, { foreignKey: "driverId" });

db.school.hasMany(db.users, {
  foreignKey: "schoolId",
  constraints: false,
  indexes: [{ fields: ["schoolId"] }],
});

db.users.belongsTo(db.school, { foreignKey: "schoolId" });
db.roles.belongsTo(db.school, { foreignKey: "schoolId" });
db.permissions.belongsTo(db.school, { foreignKey: "schoolId" });
db.classes.belongsTo(db.school, { foreignKey: "schoolId" });
db.classRoom.belongsTo(db.school, { foreignKey: "schoolId" });
db.sections.belongsTo(db.school, { foreignKey: "schoolId" });
db.subjects.belongsTo(db.school, { foreignKey: "schoolId" });
db.vehicles.belongsTo(db.school, { foreignKey: "schoolId" });
db.drivers.belongsTo(db.school, { foreignKey: "schoolId" });
db.employees.belongsTo(db.school, { foreignKey: "schoolId" });
db.departments.belongsTo(db.school, { foreignKey: "schoolId" });
db.destinations.belongsTo(db.school, { foreignKey: "schoolId" });
db.leaveTypes.belongsTo(db.school, { foreignKey: "schoolId" });
db.leaveRequests.belongsTo(db.school, { foreignKey: "schoolId" });
db.academicYear.belongsTo(db.school, { foreignKey: "schoolId" });
db.assets.belongsTo(db.school, { foreignKey: "schoolId" });
db.events.belongsTo(db.school, { foreignKey: "schoolId" });
db.students.belongsTo(db.school, { foreignKey: "schoolId" });
db.studentFee.belongsTo(db.school, { foreignKey: "schoolId" });
db.studentMarks.belongsTo(db.school, { foreignKey: "schoolId" });
db.studentAttendance.belongsTo(db.school, { foreignKey: "schoolId" });
db.dispatches.belongsTo(db.school, { foreignKey: "schoolId" });
db.parents.belongsTo(db.school, { foreignKey: "schoolId" });
db.timetable.belongsTo(db.school, { foreignKey: "schoolId" });
db.expenses.belongsTo(db.school, { foreignKey: "schoolId" });

// db.school.belongsTo(db.roles, { foreignKey: "roleId" });

module.exports = db;
