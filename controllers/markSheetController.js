const model = require("../models/modelConfig");

const Marks = model.assessmentMarks;
const Students = model.students;
const Assessment = model.assesments;
const School = model.school;
const Subject = model.subjects;
const Section = model.sections;
const Class = model.classes;

const SubjectScore = model.subjectScore;

// const createMarks = async (req, res) => {
//   const { studentId, assessmentId, score, schoolId } = req.body;
//   try {
//     const school = await School.findByPk(schoolId);
//     if (!school) {
//       return res.status(404).json({ status: 404, message: "School not found" });
//     }

//     const assessment = await Assessment.findByPk(assessmentId);
//     if (!assessment) {
//       return res
//         .status(404)
//         .json({ status: 404, message: "Assessment not found" });
//     }

//     console.log(assessment.subjectId);

//     const student = await Students.findByPk(studentId);
//     if (!student) {
//       return res
//         .status(404)
//         .json({ status: 404, message: "Student not found" });
//     }

//     if (score > assessment.maxMarks) {
//       return res.status(400).json({
//         status: 400,
//         message: `Score cannot exceed maximum marks: ${assessment.maxMarks}`,
//       });
//     }

//     const existingMark = await Marks.findOne({
//       where: { studentId, assessmentId, schoolId },
//     });

//     if (existingMark) {
//       return res.status(400).json({
//         status: 400,
//         message: "Mark already exists for this student and assessment",
//       });
//     }

//     const payload = {
//       studentId,
//       assessmentId,
//       score,
//       schoolId,
//     };

//     await Marks.create(payload);

//     // Calculate total obtained marks for the student on a specific subject
//     let subjectScore = await SubjectScore.findOne({
//       where: { studentId, subjectId: assessment.subjectId },
//     });

//     if (!subjectScore) {
//       subjectScore = await SubjectScore.create({
//         studentId,
//         subjectId: assessment.subjectId,
//         schoolId,
//       });
//     }

//     const newObtainedMarks = await Marks.sum("score", {
//       where: { studentId },
//     });

//     if (newObtainedMarks > subjectScore.totalMarks) {
//       return res.status(400).json({
//         status: 400,
//         message: `Total marks for the subject exceeded: ${subjectScore.totalMarks}`,
//       });
//     }

//     await subjectScore.update({ obtainedMarks: newObtainedMarks });

//     res.status(201).json(payload);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const createMarks = async (req, res) => {
  const { studentId, assessmentId, score, schoolId } = req.body;

  try {
    const school = await School.findByPk(schoolId);
    if (!school) {
      return res.status(404).json({ status: 404, message: "School not found" });
    }

    const assessment = await Assessment.findByPk(assessmentId, {
      include: [Subject],
      raw: true,
    });

    if (!assessment) {
      return res
        .status(404)
        .json({ status: 404, message: "Assessment not found" });
    }

    const student = await Students.findByPk(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ status: 404, message: "Student not found" });
    }

    if (score > assessment.maxMarks) {
      return res.status(400).json({
        status: 400,
        message: `Score cannot exceed maximum marks: ${assessment.maxMarks}`,
      });
    }

    const existingMark = await Marks.findOne({
      where: { studentId, assessmentId, schoolId },
    });

    if (existingMark) {
      return res.status(400).json({
        status: 400,
        message: "Mark already exists for this student and assessment",
      });
    }
    const subjectId = assessment.subjectId;

    const semisterId = assessment.semisterId;

    const payload = {
      studentId,
      assessmentId,
      score,
      schoolId,
      semisterId,
    };

    await Marks.create(payload);

    // Calculate total obtained marks for the student on a specific subject
    const newObtainedMarks = await Marks.sum("score", {
      where: { studentId, assessmentId, schoolId },
    });

    if (newObtainedMarks > assessment.maxMarks) {
      return res.status(400).json({
        status: 400,
        message: `Total marks for the subject exceeded: ${assessment.maxMarks}`,
      });
    }

    // Update or create SubjectScore entry
    let subjectScore = await SubjectScore.findOne({
      where: { studentId, subjectId },
    });

    if (!subjectScore) {
      subjectScore = await SubjectScore.create({
        studentId,
        subjectId,
        obtainedMarks: newObtainedMarks,
        schoolId,
        semisterId: semisterId,
      });
    } else {
      const subjectId = assessment.subjectId;

      // Calculate total obtained marks for the student on a specific subject
      const newObtainedMarks = await Marks.sum("score", {
        where: { studentId, assessmentId, schoolId },
      });

      if (newObtainedMarks > assessment.maxMarks) {
        return res.status(400).json({
          status: 400,
          message: `Total marks for the subject exceeded: ${assessment.maxMarks}`,
        });
      }

      // Update or create SubjectScore entry
      let subjectScore = await SubjectScore.findOne({
        where: { studentId, subjectId },
      });

      if (!subjectScore) {
        subjectScore = await SubjectScore.create({
          studentId,
          subjectId,
          obtainedMarks: newObtainedMarks,
          schoolId,
          semisterId,
        });
      } else {
        const updatedObtainedMarks =
          subjectScore.obtainedMarks + newObtainedMarks;
        await subjectScore.update({ obtainedMarks: updatedObtainedMarks });
      }
    }
    res.status(201).json(payload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMarks = async (req, res) => {
  const marks = await Marks.findAll({
    include: [Students, Assessment],
    raw: true,
  });

  res.send(marks);
};

const getMarksBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const marks = await Marks.findAll({
    where: { schoolId: schoolId },
    include: [Students, School, Section],
    raw: true,
  });

  res.send(marks);
};

// get assessments by studentId and assessmentId
const getMarksByStudentAndAssessment = async (req, res) => {
  const { schoolId, studentId, assessmentId } = req.params;

  const marks = await Marks.findAll({
    where: { schoolId, studentId, assessmentId },
    include: [
      {
        model: Assessment,
        include: [Subject, Section, Class], // Include the Subject model through Assessment association
      },
      School,
      Students,
    ],
    raw: true,
  });

  if (marks.length == 0)
    return res.status(404).send({
      status: 404,
      message: `no marks record for this student , assessment`,
    });

  // Concatenate first name, middle name, and last name into a new property called fullName
  const marksWithFullName = marks.map((mark) => {
    const fullName = `${mark["student.firstName"] || ""} ${
      mark["student.middleName"] || ""
    } ${mark["student.lastName"] || ""}`;
    return { ...mark, fullName };
  });

  res.send(marksWithFullName);
};

const getMarksById = async (req, res) => {
  let id = req.params.id;

  const marks = await Marks.findOne({ where: { id: id } });

  if (marks === null)
    return res
      .status(404)
      .send({ status: 404, message: `marks with id ${id} not found` });

  res.send(marks);
};

// const updateMarks = async (req, res) => {
//   const { schoolId, id } = req.params;
//   try {
//     // Find the assessment record by schoolId and id
//     let marks = await Marks.findOne({ where: { schoolId, id } });
//     // If marks doesn't exist, return a 404 error
//     if (!marks) {
//       return res
//         .status(404)
//         .send({ status: 404, message: `marks with id ${id} not found` });
//     }

//     // Update the marks with the data from req.body
//     await marks.update(req.body);
//     // Fetch the updated marks (optional)
//     marks = await Marks.findOne({ where: { schoolId, id } });

//     // Send the updated assessment as a response
//     res.status(200).send(marks);
//   } catch (error) {
//     // Handle any errors that occur during the update process
//     res.status(500).send("Error updating marks");
//   }
// };

const updateMarks = async (req, res) => {
  const { schoolId, id } = req.params;
  try {
    // Find the marks record by schoolId and id
    let marks = await Marks.findOne({ where: { schoolId, id } });
    // If marks doesn't exist, return a 404 error
    if (!marks) {
      return res
        .status(404)
        .send({ status: 404, message: `Marks with id ${id} not found` });
    }

    // Capture the existing data before the update
    const { studentId, assessmentId, score } = marks;

    // Update the marks with the data from req.body
    await marks.update(req.body);
    // Fetch the updated marks
    marks = await Marks.findOne({ where: { schoolId, id } });

    // Calculate total obtained marks for the student on a specific assessment
    const newObtainedMarks = await Marks.sum("score", {
      where: { studentId, assessmentId, schoolId },
    });

    // Fetch assessment data to check maximum marks
    const assessment = await Assessment.findByPk(assessmentId);

    if (!assessment) {
      return res
        .status(404)
        .json({ status: 404, message: "Assessment not found" });
    }

    // Check if total obtained marks exceed the maximum marks allowed for the assessment
    if (newObtainedMarks > assessment.maxMarks) {
      // Revert the update and send an error response if the total obtained marks exceed the maximum
      await marks.update({ score }); // Revert the score update
      return res.status(400).json({
        status: 400,
        message: `Total marks for the assessment exceeded: ${assessment.maxMarks}`,
      });
    }

    // Update or create SubjectScore entry
    let subjectScore = await SubjectScore.findOne({
      where: { studentId, subjectId: assessment.subjectId },
    });

    if (!subjectScore) {
      subjectScore = await SubjectScore.create({
        studentId,
        subjectId: assessment.subjectId,
        obtainedMarks: newObtainedMarks,
        schoolId,
        semisterId: assessment.semisterId,
      });
    } else {
      // Update the existing SubjectScore entry with the new obtained marks
      await subjectScore.update({ obtainedMarks: newObtainedMarks });
    }

    // Send the updated assessment marks as a response
    res.status(200).send(marks);
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).send("Error updating marks");
  }
};

const deleteMarks = async (req, res) => {
  let id = req.params.id;

  const marks = await Marks.destroy({ where: { id: id } });

  if (marks === null)
    return res
      .status(404)
      .send({ status: 404, message: `marks with id ${id} not found` });

  res.send("deleted marks");
};

module.exports = {
  createMarks,
  getMarks,
  getMarksById,
  updateMarks,
  deleteMarks,
  getMarksBySchool,
  getMarksByStudentAndAssessment,
};
