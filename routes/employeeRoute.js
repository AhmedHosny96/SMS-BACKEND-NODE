const router = require("express").Router();
const Employee = require("../models/employee");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Employee.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Employee.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    if (data.length === 0)
      return res.status(400).send("employee not found with " + id);

    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  const {
    departmentId,
    titleId,
    joinedDate,
    qualification,
    totalExperience,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    phoneNumber,
    email,
    country,
    city,
    subCity,
    kebele,
    bankAccount,
  } = req.body;
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const employee = new Employee({
    departmentId,
    titleId,
    joinedDate,
    qualification,
    totalExperience,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    phoneNumber,
    email,
    country,
    city,
    subCity,
    kebele,
    image: req.file.filename,
    bankAccount,
  });
  Employee.create(employee, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  // validation

  if (!req.body) return res.status(400).send("body cannot be empty");

  const { id } = req.params;

  Employee.findByIdAndUpdate(id, new Employee(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send({ message: "employee not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

// delete
router.delete("/:id", async (req, res) => {
  Employee.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("employee not found with id " + req.params.id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
