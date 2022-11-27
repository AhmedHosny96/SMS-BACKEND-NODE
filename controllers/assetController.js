const model = require("../models/modelConfig");

const Asset = model.assets;

const createAsset = async (req, res) => {
  const { itemName, model, quantity, remark, category, status } = req.body;

  let subject = await Asset.findOne({
    where: {
      itemName: itemName,
    },
  });

  if (subject) return res.status(400).send("asset with the same name exists");

  let payload = {
    itemName,
    model,
    quantity,
    remark,
    category,
    status,
  };
  await Asset.create(payload);
  res.send(payload);
};

const getassets = async (req, res) => {
  const asset = await Asset.findAll({});
  res.send(asset);
};

const getAssetById = async (req, res) => {
  let id = req.params.id;

  const asset = await Asset.findOne({
    where: { assetId: id },
  });

  if (asset === null)
    return res.status(404).send(`asset with id ${id} not found`);

  res.send(asset);
};

const updateAsset = async (req, res) => {
  let id = req.params.id;

  const asset = await Asset.update(req.body, {
    where: { assetId: id },
  });

  if (asset === null)
    return res.status(404).send(`asset with id ${id} not found`);

  res.status(200).send(asset);
};

const deleteAsset = async (req, res) => {
  let id = req.params.id;

  const asset = await Asset.destroy({
    where: { assetId: id },
  });

  if (asset === null)
    return res.status(404).send(`asset with id ${id} not found`);

  res.send("deleted asset");
};

module.exports = {
  createAsset,
  getassets,
  getAssetById,
  updateAsset,
  deleteAsset,
};
