const { Op } = require("sequelize");
const model = require("../models/modelConfig");

const ClassRoom = model.classRoom;
const Section = model.sections;
const Class = model.classes;
const School = model.school;

const createClassRoom = async (req, res) => {
  const { name, capacity, classId, sectionId, schoolId, status } = req.body;

  let classRoom = await ClassRoom.findOne({
    where: {
      name: name,
    },
  });

  if (classRoom)
    return res
      .status(400)
      .send({ status: 400, message: "classRoom with the same name exists" });

  let payload = {
    name,
    capacity,
    classId,
    sectionId,
    schoolId,
    status,
  };

  await ClassRoom.create(payload);

  res.send(payload);
};

const getClassRooms = async (req, res) => {
  const classRooms = await ClassRoom.findAll({
    include: [Class, Section],
    raw: true,
  });

  res.send(classRooms);
};

const getClassRoomsBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const classRooms = await ClassRoom.findAll({
    where: { schoolId: schoolId },
    include: [Class, Section, School],
    raw: true,
  });

  res.send(classRooms);
};

const getClassRoomId = async (req, res) => {
  let id = req.params.id;

  const classroom = await ClassRoom.findOne({ where: { id: id } });

  if (!classroom)
    return res
      .status(404)
      .send({ status: 404, message: `classroom with id ${id} not found` });

  res.send(classroom);
};

// const getSectionByClassId = async (req, res) => {
//   let classId = req.params.classId;

//   const section = await ClassRoom.findAll({
//     where: { classId: classId },
//     include: [Class],
//     raw: true,
//   });

//   if (!section)
//     return res
//       .status(404)
//       .send({ status: 200, message: `section with classId ${id} not found` });

//   res.send(section);
// };

const updateClassRoom = async (req, res) => {
  let id = req.params.id;

  const section = await ClassRoom.update(req.body, { where: { id: id } });

  if (!section)
    return res
      .status(404)
      .send({ status: 404, message: `classroom with id ${id} not found` });

  res.status(200).send(section);
};

const deleteClassRoom = async (req, res) => {
  let id = req.params.id;

  const section = await ClassRoom.destroy({ where: { id: id } });

  if (section === null)
    return res
      .status(404)
      .send({ status: 404, message: `classroom with id ${id} not found` });

  res.send("deleted subject");
};

module.exports = {
  createClassRoom,
  getClassRooms,
  getClassRoomId,
  //   getSectionByClassId,
  updateClassRoom,
  deleteClassRoom,
  getClassRoomsBySchool,
};
