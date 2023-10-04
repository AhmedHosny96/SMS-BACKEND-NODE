const model = require("../models/modelConfig");
const { Op } = require("sequelize");

const Permission = model.permissions;

const School = model.school;

const createPermission = async (req, res) => {
  const { permission, category, schoolId } = req.body;

  const permissions = await Permission.findOne({
    where: {
      [Op.and]: [
        {
          permission: permission, // Check for the same name
        },
        {
          schoolId: schoolId, // Check for the same schoolId
        },
      ],
    },
  });

  if (permissions)
    return res
      .status(400)
      .send({ status: 400, message: "permission already exists " });

  let payload = {
    permission,
    category,
    schoolId,
  };

  await Permission.create(payload);

  res.send(payload);
};

const getPermission = async (req, res) => {
  const permission = await Permission.findAll({});

  res.send(permission);
};

const getPermissionsBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const permission = await Permission.findAll({
    where: { schoolId: schoolId },
    include: [School],
    raw: true,
  });

  res.send(permission);
};

const getPermissionById = async (req, res) => {
  let id = req.params.id;

  const permission = await Permission.findOne({ where: { id: id } });

  if (permission === null)
    return res
      .status(404)
      .send({ status: 404, message: `permission with id ${id} not found` });

  res.send(permission);
};

const updatePermission = async (req, res) => {
  let id = req.params.id;

  const permission = await Permission.update(req.body, { where: { id: id } });

  if (permission === null)
    return res
      .status(404)
      .send({ status: 404, message: `permission with id ${id} not found` });

  res.status(200).send(permission);
};

const deletePermission = async (req, res) => {
  let id = req.params.id;

  const permission = await Permission.destroy({ where: { id: id } });

  if (permission === null)
    return res
      .status(404)
      .send({ status: 404, message: `permission with id ${id} not found` });

  res.send("deleted role");
};

module.exports = {
  createPermission,
  getPermission,
  getPermissionById,
  updatePermission,
  deletePermission,
  getPermissionsBySchool,
};
