const router = require("express").Router();
const VehicleType = require("../models/vehicleType");

// find all
router.get("/", async (req, res) => {
  VehicleType.findAll((err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  VehicleType.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

router.post("/", async (req, res) => {
  const { type } = req.body;

  if (!req.body) return res.status(400).send("body cannot be empty");

  const section = new VehicleType({
    type,
  });

  VehicleType.create(section, (err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  VehicleType.findByIdAndUpdate(id, new VehicleType(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res
            .status(400)
            .send({ message: "vehicle type not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  VehicleType.findByIdAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("subject not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
