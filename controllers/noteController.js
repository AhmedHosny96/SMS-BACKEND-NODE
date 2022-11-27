const model = require("../models/modelConfig");

const Note = model.notes;
const Subject = model.subjects;
const Class = model.classes;
const Section = model.sections;

const createNote = async (req, res) => {
  const { title, description, attachment, classId, sectionId, subjectId } =
    req.body;

  let note = await Note.findOne({
    where: {
      title: title,
    },
  });

  if (note) return res.status(400).send("note with the same name exists");

  let payload = {
    title,
    description,
    attachment,
    classId,
    sectionId,
    subjectId,
  };

  await Note.create(payload);

  res.send(payload);
};

const getNotes = async (req, res) => {
  const notes = await Note.findAll({ include: [Class, Section, Subject] });

  res.send(notes);
};

const getNoteById = async (req, res) => {
  let id = req.params.id;

  const note = await Note.findOne({ where: { noteId: id } });

  if (note === null)
    return res.status(404).send(`note with id ${id} not found`);

  res.send(note);
};

const updateNote = async (req, res) => {
  let id = req.params.id;

  const note = await Note.update(req.body, { where: { noteId: id } });

  if (note === null)
    return res.status(404).send(`note with id ${id} not found`);

  res.status(200).send(note);
};

const deleteNote = async (req, res) => {
  let id = req.params.id;

  const note = await Note.destroy({ where: { noteID: id } });

  if (note === null)
    return res.status(404).send(`note with id ${id} not found`);

  res.send("deleted note");
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
