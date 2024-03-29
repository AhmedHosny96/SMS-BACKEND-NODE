const express = require("express");
const error = require("../middlewares/error");
const subjectRoute = require("../routes/subjectsRoute");
const classRoute = require("../routes/classRoute");
const sectionRoute = require("../routes/sectionRoute");
const academicYearRoute = require("../routes/academicYearRoute");
const assetRoute = require("../routes/assetRoute");
const departmentRoute = require("../routes/departmentRoute");
const jobTitleRoute = require("../routes/jobTitleRoute");
const employeeRoute = require("../routes/employeeRoute");
const assesmentRoute = require("../routes/assesmentRoute");
const leaveTypeRoute = require("../routes/leaveTypeRoute");
const leaveRequestRoute = require("../routes/leaveRequestRoute");
const examRoute = require("../routes/examRoute");
const semisterRoute = require("../routes/semisterRoute");

const roleRoute = require("../routes/roleRoute");
const authRoute = require("../routes/authRoute");
const userRoute = require("../routes/userRoute");
const parentRoute = require("../routes/parentRoute");
// const teacherRoute = require("../routes/teacherRoute");
// const institutionRoute = require("../routes/institutionRoute");
const driverRoute = require("../routes/driverRoute");
const vehicleRoute = require("../routes/vehicleRoute");
const destinationRoute = require("../routes/destinationRoute");
const shiftRoute = require("../routes/shiftRoute");
const periodRoute = require("../routes/periodRoute");
// const timetableRoute = require("../routes/timetableRoute");
const noteRoute = require("../routes/noteRoute");
const assignmentRoute = require("../routes/assignmentRoute");
// const taskRoute = require("../routes/taskRoute");

const studentAttendanceRoute = require("../routes/studentAttendanceRoute");
const newsFeedRoute = require("../routes/newsFeedRoute");
const studentRoute = require("../routes/studentRoute");
const smsRoute = require("../routes/smsRoute");

const studentFee = require("../routes/studentFeeRoute");

const markSheet = require("../routes/markSheetRoute");
// const eventRoute = require("../routes/eventRoute");

// const studentDocumentRoute = require("../routes/studentDocumentRoute");
const visitorRoute = require("../routes/visitorRoute");
const timetableRoute = require("../routes/timetableRoute");
const permissionRoute = require("../routes/permissionRoute");
const expenseRoute = require("../routes/expenseRoute");
const schoolRoute = require("../routes/schoolRoute");
const schoolBranchRoute = require("../routes/schoolbranchRoute");
const classRoomRoute = require("../routes/classRoomRoute");
const eventRoute = require("../routes/eventRoute");
const taskRoute = require("../routes/taskRoute");
const messageRoutes = require("../routes/messageRoutes");
const dispatchRoute = require("../routes/dispatchRoute");
const gradeReportRoute = require("../routes/gradeReportRoute");

module.exports = (app) => {
  app.use(express.json());

  app.use("/api/subjects", subjectRoute);
  app.use("/api/classes", classRoute);
  app.use("/api/sections", sectionRoute);
  app.use("/api/sections", sectionRoute);
  app.use("/api/academic-year", academicYearRoute);
  app.use("/api/assets", assetRoute);
  app.use("/api/departments", departmentRoute);
  app.use("/api/job-titles", jobTitleRoute);
  app.use("/api/employees", employeeRoute);
  app.use("/api/assessments", assesmentRoute);
  app.use("/api/leave-types", leaveTypeRoute);
  app.use("/api/leave-requests", leaveRequestRoute);
  app.use("/api/exams", examRoute);

  app.use("/api/student-fee", studentFee);

  app.use("/api/roles", roleRoute);
  app.use("/api", authRoute);
  app.use("/api/users", userRoute);

  app.use("/api/parents", parentRoute);
  // app.use("/api/teachers", teacherRoute);
  // app.use("/api/institution", institutionRoute);
  app.use("/api/drivers", driverRoute);
  app.use("/api/vehicles", vehicleRoute);
  app.use("/api/destinations", destinationRoute);
  app.use("/api/shifts", shiftRoute);
  app.use("/api/periods", periodRoute);
  // app.use("/api/timetable", timetableRoute);
  app.use("/api/notes", noteRoute);
  app.use("/api/assignments", assignmentRoute);
  // app.use("/api/tasks", taskRoute);
  app.use("/api/semister", semisterRoute);

  app.use("/api/student-attendance", studentAttendanceRoute);
  app.use("/api/newsfeed", newsFeedRoute);
  app.use("/api/students", studentRoute);
  app.use("/api/student-marks", markSheet);
  app.use("/api/timetable", timetableRoute);
  // app.use("/api/studentDocuments", studentDocumentRoute);
  // app.use("/api/events", eventRoute);
  app.use("/api/visitors", visitorRoute);

  app.use("/api/send-sms", smsRoute);
  app.use("/api/permissions", permissionRoute);

  app.use("/api/change-password", userRoute);

  app.use("/api/expenses", expenseRoute);

  app.use("/api/school-profile", schoolRoute);
  app.use("/api/school-branches", schoolBranchRoute);
  app.use("/api/class-rooms", classRoomRoute);
  app.use("/api/events", eventRoute);
  app.use("/api/tasks", taskRoute);
  app.use("/api/messages", messageRoutes);
  app.use("/api/dispatches", dispatchRoute);
  app.use("/api/grade-report", gradeReportRoute);

  app.use(error);
};
