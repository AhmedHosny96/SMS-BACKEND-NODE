const { Op } = require("sequelize");
const model = require("../models/modelConfig");

const SubjectScore = model.subjectScore;
const School = model.school;
const Subject = model.subjects;
const Student = model.students;
const Class = model.classes;
const Semister = model.semister;
const AcademicYear = model.academicYear;

// const createDepartment = async (req, res) => {
//   const { name, description, schoolId } = req.body;

//   const department = await Department.findOne({
//     where: {
//       [Op.and]: [
//         {
//           name: name, // Check for the same name
//         },
//         {
//           schoolId: schoolId, // Check for the same schoolId
//         },
//       ],
//     },
//   });
//   if (department)
//     return res.status(400).send("Department with the same name exists");

//   let payload = {
//     name,
//     description,
//     schoolId,
//   };

//   await Department.create(payload);

//   res.send(payload);
// };
const getGradeReportOfStudent = async (req, res) => {
  try {
    const { schoolId, semisterId, studentId } = req.params;

    const subjectScores = await SubjectScore.findAll({
      where: { schoolId, semisterId, studentId },
      include: [
        { model: Subject },
        { model: Student },
        { model: School },
        { model: Semister, include: [{ model: AcademicYear }] }, // Include AcademicYear here
      ], // attributes: ["subjectId", "obtainedMarks"],
      raw: true,
      // nest: true,
    });

    console.log(subjectScores);

    const groupedData = subjectScores.map(
      ({
        subjectId,
        obtainedMarks,
        "subject.name": subjectName,
        totalMarks,
        "student.admissionNumber": studentAdmission,
        "student.firstName": firstName,
        "student.middleName": middleName,
        "student.lastName": lastName,
        "semister.name": semister,
        "semister.academicYear.name": academicYear,
      }) => {
        // Concatenate first name, middle name, and last name into fullName
        const fullName = `${firstName} ${
          middleName ? middleName + " " : ""
        }${lastName}`;

        return {
          subjectId,
          subjectName,
          obtainedMarks,
          totalMarks,
          studentAdmission,
          fullName,
          semister,
          academicYear,
        };
      }
    );

    console.log(subjectScores);

    // const studentData = { marks: groupedData };

    res.json(groupedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const getDepartmentsBySchool = async (req, res) => {
//   let schoolId = req.params.schoolId;

//   const department = await Department.findAll({
//     where: { schoolId: schoolId },
//     include: [School],
//     raw: true,
//   });
//   res.send(department);
// };

// const getDepartmentById = async (req, res) => {
//   let id = req.params.id;

//   const department = await Department.findOne({ where: { id: id } });

//   if (department === null)
//     return res
//       .status(404)
//       .send({ status: 404, message: `Department with id ${id} not found` });

//   res.send(department);
// };

// const updateDepartment = async (req, res) => {
//   let id = req.params.id;

//   const department = await Department.update(req.body, {
//     where: { departmentId: id },
//   });

//   if (department === null)
//     return res
//       .status(404)
//       .send({ status: 404, message: `Department with id ${id} not found` });

//   res.send(department);
// };

// const deleteDepartment = async (req, res) => {
//   let id = req.params.id;

//   const department = await Department.destroy({ where: { departmentId: id } });

//   if (department === null)
//     return res
//       .status(404)
//       .send({ status: 404, message: `Department with id ${id} not found` });

//   res.send("deleted Department");
// };

module.exports = {
  //   createDepartment,
  getGradeReportOfStudent,
  //   getDepartmentById,
  //   updateDepartment,
  //   deleteDepartment,
  //   getGradeReportOfStudentBySchool,
};
