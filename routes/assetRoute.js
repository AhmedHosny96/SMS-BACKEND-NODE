const router = require("express").Router();
const Asset = require("../models/asset");

// find all
router.get("/", async (req, res) => {
  Asset.findAll((err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Asset.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

router.post("/", async (req, res) => {
  const { itemName, category, status, remark, model, quantity } = req.body;

  if (!req.body) return res.status(400).send("body cannot be empty");

  const asset = new Asset({
    itemName,
    model,
    remark,
    quantity,
    category,
    status,
  });

  Asset.create(asset, (err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  Asset.findByIdAndUpdate(id, new Asset(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send({ message: "item not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Asset.findByIdAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("item not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
