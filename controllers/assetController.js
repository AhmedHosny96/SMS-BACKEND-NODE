const model = require("../models/modelConfig");

const Asset = model.assets;
const School = model.school;

const createAsset = async (req, res) => {
  const { itemName, model, quantity, remark, category, schoolId, status } =
    req.body;

  const asset = await Asset.findOne({
    where: {
      [Op.and]: [
        {
          itemName: itemName, // Check for the same name
        },
        {
          schoolId: schoolId, // Check for the same schoolId
        },
      ],
    },
  });
  if (asset)
    return res
      .status(400)
      .send({ status: 400, message: "asset with the same name exists" });

  let payload = {
    itemName,
    model,
    quantity,
    remark,
    category,
    schoolId,
    status,
  };
  await Asset.create(payload);
  res.send(payload);
};

const getAssets = async (req, res) => {
  const asset = await Asset.findAll({});
  res.send(asset);
};

const getAssetsBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const asset = await Asset.findAll({
    where: { schoolId: schoolId },
    include: [School],
    raw: true,
  });
  res.send(asset);
};

const getAssetById = async (req, res) => {
  let id = req.params.id;

  const asset = await Asset.findOne({
    where: { id: id },
  });

  if (!asset)
    return res
      .status(404)
      .send({ status: 404, message: `asset with id ${id} not found` });

  res.send(asset);
};

const updateAsset = async (req, res) => {
  let id = req.params.id;

  const asset = await Asset.update(req.body, {
    where: { id: id },
  });

  if (!asset) return res.status(404).send(`asset with id ${id} not found`);

  res.status(200).send(asset);
};

const deleteAsset = async (req, res) => {
  let id = req.params.id;

  const asset = await Asset.destroy({
    where: { id: id },
  });

  if (!asset) return res.status(404).send(`asset with id ${id} not found`);

  res.send("deleted asset");
};

module.exports = {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  getAssetsBySchool,
  deleteAsset,
};
