const router = require("express").Router();
const JobTitle = require("../models/jobTitle");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  JobTitle.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  JobTitle.findById(id, (err, data) => {
    if (data.length === 0)
      return res.status(400).send("title not found with " + id);
    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const title = new JobTitle({
    name: req.body.name,
  });
  JobTitle.create(title, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  JobTitle.findByIdAndUpdate(id, new JobTitle(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send({ message: "title not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  JobTitle.findByidAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("title not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

module.exports = router;
