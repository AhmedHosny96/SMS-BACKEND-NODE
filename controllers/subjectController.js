const model = require("../models/modelConfig");

const Subject = model.subjects;

const createSubject = async (req, res) => {
  const { name, code, description, schoolId } = req.body;

  let subject = await Subject.findOne({
    where: {
      name: name,
      // code: code,
    },
  });

  if (subject)
    return res.status(400).send("Subject with the same name or code exists");

  let payload = {
    name,
    code,
    description,
    schoolId,
  };

  await Subject.create(payload);

  res.send(payload);
};

const getSubjects = async (req, res) => {
  const subjects = await Subject.findAll({});

  res.send(subjects);
};

const getSubjectBySchool = async (req, res) => {
  const schoolId = req.params.schoolId; // Assuming you pass the schoolId as a route parameter

  try {
    // Fetch subjects filtered by schoolId
    const subjects = await Subject.findAll({
      where: {
        schoolId: schoolId,
      },
    });

    res.status(200).send(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getSubjectById = async (req, res) => {
  let id = req.params.id;

  let subject = await Subject.findOne({ where: { id: id } });

  if (subject === null)
    return res
      .status(404)
      .send({ status: 404, message: `subject with id ${id} not found` });

  res.send(subject);
};

const updateSubject = async (req, res) => {
  let id = req.params.id;

  let subject = await Subject.update(req.body, { where: { id: id } });

  //   let exists = await Subject.findOne({
  //     where: {
  //       name: name,
  //       code: code,
  //     },
  //   });

  //   if (exists)
  //     return res.status(400).send("Subject with the same name or code exists");

  if (subject === null)
    return res.status(404).send(`subject with id ${id} not found`);

  res.status(200).send(subject);
};

const deleteSubject = async (req, res) => {
  let id = req.params.id;

  const subject = await Subject.destroy({ where: { id: id } });

  if (subject === null)
    return res.status(404).send(`subject with id ${id} not found`);

  res.send("deleted subject");
};

module.exports = {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  getSubjectBySchool,
};
