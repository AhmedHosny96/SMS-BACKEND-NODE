const router = require("express").Router();
const Destination = require("../models/destination");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Destination.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Destination.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    if (data.length === 0)
      return res.status(400).send("destination not found with " + id);

    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  const { vehicleId, driverId, startPoint, stopPoint, code } = req.body;
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const event = new Destination({
    vehicleId,
    driverId,
    startPoint,
    stopPoint,
    code,
  });
  Destination.create(event, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { vehicleId, driverId, startPoint, stopPoint, code } = req.body;

  // validation

  if (!req.body) return res.status(400).send("body cannot be empty");
  const { id } = req.params;
  Destination.findByIdAndUpdate(
    id,
    new Destination({
      vehicleId,
      driverId,
      startPoint,
      stopPoint,
      code,
    }),
    (err, data) => {
      if (err) {
        err.kind === "not_found"
          ? res
              .status(400)
              .send({ message: "destination not found with id " + id })
          : res.status(500).json(err.message);
      }

      res.send(data);
    }
  );
});

// delete
router.delete("/:id", async (req, res) => {
  Destination.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("destination not found with id " + req.params.id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
