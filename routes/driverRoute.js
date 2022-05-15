const router = require("express").Router();
const Driver = require("../models/driver");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Driver.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Driver.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    if (data.length === 0)
      return res.status(400).send("driver not found with " + id);

    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  const { fullName, phoneNumber, licenceNumber, dob, vehicleId } = req.body;
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const status = new Driver({
    fullName,
    phoneNumber,
    licenceNumber,
    dob,
    vehicleId,
  });
  Driver.create(status, (err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { fullName, phoneNumber, licenceNumber, dob, vehicleId } = req.body;

  // validation

  if (!req.body) return res.status(400).send("body cannot be empty");
  const { id } = req.params;
  Driver.findByIdAndUpdate(
    id,
    new Driver({
      fullName,
      phoneNumber,
      licenceNumber,
      dob,
      vehicleId,
    }),
    (err, data) => {
      if (err) {
        err.kind === "not_found"
          ? res.status(400).send({ message: "driver not found with id " + id })
          : res.status(500).json(err.message);
      }

      res.send(data);
    }
  );
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  Driver.findByIdAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("subject not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
