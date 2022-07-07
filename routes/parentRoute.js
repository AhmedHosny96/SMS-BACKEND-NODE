const router = require("express").Router();
const Parent = require("../models/parent");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Parent.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Parent.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    if (data.length === 0)
      return res.status(400).send("parent not found with " + id);

    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  const { fullName, phoneNumber, email, type, occupation, studentId } =
    req.body;
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const parent = new Parent({
    fullName,
    phoneNumber,
    email,
    occupation,
    type,
    studentId,
  });
  Parent.create(parent, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { fullName, phoneNumber, email, occupation, studentId } = req.body;

  // validation

  if (!req.body) return res.status(400).send("body cannot be empty");
  const { id } = req.params;
  Parent.findByIdAndUpdate(
    id,
    new Parent({
      fullName,
      phoneNumber,
      email,
      occupation,
      studentId,
    }),
    (err, data) => {
      if (err) {
        err.kind === "not_found"
          ? res.status(400).send({ message: "Parent not found with id " + id })
          : res.status(500).json(err.message);
      }

      res.send(data);
    }
  );
});

// delete
router.delete("/:id", async (req, res) => {
  Parent.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("parent not found with id " + req.params.id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
