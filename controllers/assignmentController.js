const model = require("../models/modelConfig");

const Assignment = model.assignments;
const Class = model.classes;
const Section = model.sections;
const Subject = model.subjects;

const createAssigment = async (req, res) => {
  const {
    title,
    type,
    description,
    attachment,
    date,
    dueDate,
    classId,
    sectionId,
    subjectId,
  } = req.body;

  let assignment = await Assignment.findOne({
    where: {
      title: title,
    },
  });

  if (assignment)
    return res.status(400).send("assignment with the same name exists");

  let payload = {
    title,
    type,
    description,
    attachment,
    date,
    dueDate,
    classId,
    sectionId,
    subjectId,
  };
  await Assignment.create(payload);
  res.send(payload);
};

const getAssignments = async (req, res) => {
  const assignment = await Assignment.findAll({
    include: [Class, Section, Subject],
  });
  res.send(assignment);
};

const getAssignmentById = async (req, res) => {
  let id = req.params.id;

  const assignment = await Assignment.findOne({
    where: { assignmentId: id },
  });

  if (assignment === null)
    return res.status(404).send(`assignment with id ${id} not found`);

  res.send(assignment);
};

const updateAssignment = async (req, res) => {
  let id = req.params.id;

  const assignment = await Assignment.update(req.body, {
    where: { assignmentId: id },
  });

  if (assignment === null)
    return res.status(404).send(`assignment with id ${id} not found`);

  res.status(200).send(assignment);
};

const deleteAssignment = async (req, res) => {
  let id = req.params.id;

  const assignment = await Assignment.destroy({
    where: { assignmentId: id },
  });

  if (assignment === null)
    return res.status(404).send(`assignment with id ${id} not found`);

  res.send("deleted assignment");
};

module.exports = {
  createAssigment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
