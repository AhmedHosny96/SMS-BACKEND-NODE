const router = require("express").Router();
const Vehicle = require("../models/vehicle");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Vehicle.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Vehicle.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    if (data.length === 0)
      return res.status(400).send("vehicle not found with " + id);

    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  const {
    ownerName,
    ownerPhoneNumber,
    plateNumber,
    noOfSeats,
    maximumStudents,
    rentedAmount,
    vehicleTypeId,
  } = req.body;
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const status = new Vehicle(req.body);
  Vehicle.create(status, (err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const {
    ownerName,
    ownerPhoneNumber,
    plateNumber,
    noOfSeats,
    maximumStudents,
    rentedAmount,
    vehicleTypeId,
  } = req.body;

  // validation

  if (!req.body) return res.status(400).send("body cannot be empty");
  const { id } = req.params;
  Vehicle.findByIdAndUpdate(
    id,
    new Vehicle({
      ownerName,
      ownerPhoneNumber,
      plateNumber,
      noOfSeats,
      maximumStudents,
      rentedAmount,
      vehicleTypeId,
    }),
    (err, data) => {
      if (err) {
        err.kind === "not_found"
          ? res.status(400).send({ message: "vehicle not found with id " + id })
          : res.status(500).json(err.message);
      }

      res.send(data);
    }
  );
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  Vehicle.findByIdAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("vehicle not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
