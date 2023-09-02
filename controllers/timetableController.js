const model = require("../models/modelConfig");

const Timetable = model.timetable;
const Section = model.sections;
const Class = model.classes;
const Subject = model.subjects;
const Period = model.periods;
const School = model.school;

const createTimetable = async (req, res) => {
  const { day, classId, sectionId, time, subjectId, schoolId } = req.body;

  //   let leaveType = await Timetable.findOne({
  //     where: {
  //       type: type,
  //     },
  //   });

  //   if (leaveType)
  //     return res.status(400).send("leaveType with the same name exists");

  let payload = {
    day,
    classId,
    sectionId,
    time,
    subjectId,
    schoolId,
  };

  await Timetable.create(payload);

  res.send(payload);
};

const getTimeTable = async (req, res) => {
  const timetable = await Timetable.findAll({
    include: [Subject, Section, Class, School],
    raw: true,
  });

  res.send(timetable);
};

const getTimeTableById = async (req, res) => {
  let id = req.params.id;

  const timetable = await Timetable.findOne({ where: { id: id } });

  if (timetable === null)
    return res.status(404).send(`timetable with id ${id} not found`);

  res.send(timetable);
};

const getTimeTableBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const timetable = await Timetable.findAll({
    where: { schoolId: schoolId },
    include: [Subject, Section, Class, School],
    raw: true,
  });

  if (!timetable)
    return res
      .status(404)
      .send({ status: 404, message: `timetable with id ${id} not found` });

  res.send(timetable);
};

const getTimeTableByClassAndSection = async (req, res) => {
  let classId = req.params.classId;
  let sectionId = req.params.sectionId;

  const timetable = await Timetable.findAll({
    where: { classId: classId, sectionId: sectionId },
    include: [Class, Section, Subject],
    raw: true,
  });

  if (!timetable) {
    return res.status(404).send({
      status: 400,
      message: `Timetable with classId ${classId} and sectionId ${sectionId} not found`,
    });
  }
  res.send(timetable);
};

const updateTimeTable = async (req, res) => {
  let id = req.params.id;

  const timetable = await Timetable.update(req.body, {
    where: { id: id },
  });

  if (timetable === null)
    return res.status(404).send(`timetable with id ${id} not found`);

  res.status(200).send(timetable);
};

const deleteTimeTable = async (req, res) => {
  let id = req.params.id;

  const timetable = await Timetable.destroy({ where: { id: id } });

  if (timetable === null)
    return res.status(404).send(`timetable with id ${id} not found`);

  res.send("deleted timetable");
};

module.exports = {
  createTimetable,
  getTimeTable,
  getTimeTableById,
  updateTimeTable,
  deleteTimeTable,
  getTimeTableByClassAndSection,
  getTimeTableBySchool,
};
