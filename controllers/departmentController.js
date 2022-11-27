const model = require("../models/modelConfig");

const Department = model.departments;

const createDepartment = async (req, res) => {
  const { name } = req.body;

  let department = await Department.findOne({
    where: {
      name: name,
    },
  });

  if (department)
    return res.status(400).send("Department with the same name exists");

  let payload = {
    name,
  };

  await Department.create(payload);

  res.send(payload);
};

const getDepartments = async (req, res) => {
  const department = await Department.findAll({});
  res.send(department);
};

const getDepartmentById = async (req, res) => {
  let id = req.params.id;

  const department = await Department.findOne({ where: { departmentId: id } });

  if (department === null)
    return res.status(404).send(`Department with id ${id} not found`);

  res.send(department);
};

const updateDepartment = async (req, res) => {
  let id = req.params.id;

  const department = await Department.update(req.body, {
    where: { departmentId: id },
  });

  if (department === null)
    return res.status(404).send(`Department with id ${id} not found`);

  res.status(200).send(Department);
};

const deleteDepartment = async (req, res) => {
  let id = req.params.id;

  const department = await Department.destroy({ where: { departmentId: id } });

  if (Department === null)
    return res.status(404).send(`Department with id ${id} not found`);

  res.send("deleted Department");
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
