const { Op } = require("sequelize");

const model = require("../models/modelConfig");
const assesment = require("../models/assesment");

const Assessment = model.assesments;
const Class = model.classes;
const School = model.school;
const Section = model.sections;
const Subject = model.subjects;

const createAssesment = async (req, res) => {
  const {
    title,
    type,
    date,
    maxMarks,
    schoolId,
    subjectId,
    classId,
    sectionId,
    semisterId,
  } = req.body;

  const existingAssessment = await Assessment.findOne({
    where: {
      title,
      schoolId,
      subjectId,
      semisterId,
    },
  });

  if (existingAssessment) {
    return res.status(400).json({
      status: 400,
      message: "Assessment with the same record exists",
    });
  }
  let payload = {
    title,
    type,
    date,
    maxMarks,
    schoolId,
    subjectId,
    classId,
    sectionId,
    semisterId,
  };

  await Assessment.create(payload);

  res.send(payload);
};

const getAssesments = async (req, res) => {
  const assesment = await Assessment.findAll({});
  res.send(assesment);
};

const getAssessmentBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const assessment = await Assessment.findAll({
    where: { schoolId: schoolId },
    include: [School, Class, Subject, Section],
    raw: true,
  });
  res.send(assessment);
};

// get assesment by section

const getAssessmentById = async (req, res) => {
  let id = req.params.id;

  const subject = await Assessment.findOne({ where: { id: id } });

  if (!subject)
    return res
      .status(404)
      .send({ status: 404, message: `class with id ${id} not found` });

  res.send(subject);
};

// get assesment by class

const getAssesmentByClass = async (req, res) => {
  let classId = req.params.classId;

  const assesment = await Assessment.findOne({
    where: { classId: classId },
    include: [School, Class, Subject, Section],
  });

  if (!assesment)
    return res
      .status(404)
      .send({ status: 404, message: `assessment with id ${id} not found` });

  res.send(assesment);
};
// get assessment by school , class and section

const getAssessmentByClassAndSection = async (req, res) => {
  const { schoolId, classId, sectionId } = req.params;

  const assesment = await Assessment.findAll({
    where: { schoolId, classId, sectionId },
    include: [Class, Subject, Section],
    raw: true,
  });

  if (assesment.length === 0) {
    return res.status(404).send({
      status: 404,
      message: `No assessments found for this section  ${sectionId}`,
    });
  }
  // console.log(assesment.Class.name);

  res.send(assesment);
};

const getAssesmentByClaSecAndSub = async (req, res) => {
  const { schoolId, classId, sectionId, subjectId } = req.params;

  const assesment = await Assessment.findAll({
    where: { schoolId, classId, sectionId, subjectId },
    include: [Class, Subject, Section],
    raw: true,
  });

  if (assesment.length === 0) {
    return res.status(404).send({
      status: 404,
      message: `No assessments found ${sectionId}`,
    });
  }
  // console.log(assesment.Class.name);
  res.send(assesment);
};

// get assesment by section

const getAssesmentBySection = async (req, res) => {
  try {
    let { sectionId } = req.params;

    const assessments = await Assessment.findAll({
      where: { sectionId },
      include: [School, Class, Subject, Section],
      raw: true,
    });

    if (assessments.length === 0) {
      return res.status(404).send({
        status: 404,
        message: `No assessments found for this section  ${sectionId}`,
      });
    }
    res.send(assessments);
  } catch (error) {
    // Handle any errors that occur during the query or processing
    console.error("Error fetching assessments:", error);
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};

const updateAssessment = async (req, res) => {
  const { schoolId, id } = req.params;
  try {
    // Find the assessment record by schoolId and id
    let assessment = await Assessment.findOne({ where: { schoolId, id } });
    // If assessment doesn't exist, return a 404 error
    if (!assessment) {
      return res
        .status(404)
        .send({ status: 404, message: `Assessment with id ${id} not found` });
    }

    // Update the assessment with the data from req.body
    await assessment.update(req.body);
    // Fetch the updated assessment (optional)
    assessment = await Assessment.findOne({ where: { schoolId, id } });

    // Send the updated assessment as a response
    res.status(200).send(assessment);
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).send("Error updating assessment");
  }
};

const deleteAssessment = async (req, res) => {
  let id = req.params.id;

  const subject = await Assessment.destroy({ where: { id: id } });

  if (subject === null)
    return res.status(404).send(`assessment with id ${id} not found`);

  res.send("deleted assessment");
};

module.exports = {
  createAssesment,
  getAssesments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  getAssessmentBySchool,
  getAssesmentByClass,
  getAssesmentBySection,
  getAssessmentByClassAndSection,
  getAssesmentByClaSecAndSub,
};
