const router = require("express").Router();
const Student = require("../models/student");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Student.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Student.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    if (data.length === 0)
      return res.status(400).send("student not found with " + id);

    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  const {
    academicId,
    uniqueId,
    joinedDate,
    classId,
    sectionId,
    rollNo,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    birthPlace,
    nationality,
    country,
    city,
    district,
    kebele,
    phone,
    previousSchoolName,
    previousSchoolAddress,
    previousQualification,
  } = req.body;
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const student = new Student({
    academicId,
    uniqueId,
    joinedDate,
    classId,
    sectionId,
    rollNo,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    birthPlace,
    nationality,
    country,
    city,
    district,
    kebele,
    phone,
    previousSchoolName,
    previousSchoolAddress,
    previousQualification,
  });
  Student.create(student, (err, data) => {
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

  Student.findByIdAndUpdate(
    id,
    new Student({
      academicId,
      uniqueId,
      joinedDate,
      classId,
      sectionId,
      rollNo,
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      birthPlace,
      nationality,
      country,
      city,
      district,
      kebele,
      phone,
      previousSchoolName,
      previousSchoolAddress,
      previousQualification,
    }),
    (err, data) => {
      if (err) {
        err.kind === "not_found"
          ? res.status(400).send({ message: "student not found with id " + id })
          : res.status(500).json(err.message);
      }

      res.send(data);
    }
  );
});

// delete
router.delete("/:id", async (req, res) => {
  Student.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("student not found with id " + req.params.id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
