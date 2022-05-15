const router = require("express").Router();
const Teacher = require("../models/teacher");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Teacher.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Teacher.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    if (data.length === 0)
      return res.status(400).send("teacher not found with " + id);

    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  const { firstName, middleName, lastName, phoneNumber, email, statusId } =
    req.body;
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const teacher = new Teacher({
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
  });
  Teacher.create(teacher, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { firstName, middleName, lastName, phoneNumber, email, statusId } =
    req.body;

  // validation

  if (!req.body) return res.status(400).send("body cannot be empty");

  const { id } = req.params;

  Teacher.findByIdAndUpdate(
    id,
    new Teacher({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      statusId: statusId,
    }),
    (err, data) => {
      if (err) {
        err.kind === "not_found"
          ? res.status(400).send({ message: "teacher not found with id " + id })
          : res.status(500).json(err.message);
      }

      res.send(data);
    }
  );
});

// delete
router.delete("/:id", async (req, res) => {
  Teacher.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("teacher not found with id " + req.params.id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
