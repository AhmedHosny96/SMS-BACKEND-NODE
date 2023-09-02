const model = require("../models/modelConfig");

const Department = model.departments;
const School = model.school;

const createDepartment = async (req, res) => {
  const { name, description, schoolId } = req.body;

  let department = await Department.findOne({
    where: {
      name: name,
    },
  });

  if (department)
    return res.status(400).send("Department with the same name exists");

  let payload = {
    name,
    description,
    schoolId,
  };

  await Department.create(payload);

  res.send(payload);
};

const getDepartments = async (req, res) => {
  const department = await Department.findAll({});
  res.send(department);
};

const getDepartmentsBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const department = await Department.findAll({
    where: { schoolId: schoolId },
    include: [School],
    raw: true,
  });
  res.send(department);
};

const getDepartmentById = async (req, res) => {
  let id = req.params.id;

  const department = await Department.findOne({ where: { id: id } });

  if (department === null)
    return res
      .status(404)
      .send({ status: 404, message: `Department with id ${id} not found` });

  res.send(department);
};

const updateDepartment = async (req, res) => {
  let id = req.params.id;

  const department = await Department.update(req.body, {
    where: { departmentId: id },
  });

  if (department === null)
    return res
      .status(404)
      .send({ status: 404, message: `Department with id ${id} not found` });

  res.send(department);
};

const deleteDepartment = async (req, res) => {
  let id = req.params.id;

  const department = await Department.destroy({ where: { departmentId: id } });

  if (department === null)
    return res
      .status(404)
      .send({ status: 404, message: `Department with id ${id} not found` });

  res.send("deleted Department");
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  getDepartmentsBySchool,
};
