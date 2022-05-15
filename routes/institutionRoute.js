const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const Institution = require("../models/institution");

// multer config for file upload

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, req.body.code + file.originalname);
  },
});

// multer storage

const uploads = multer({
  storage: uploadStorage,
  limits: {
    fieldSize: 1024 * 1024 * 10,
  },
});

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Institution.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Institution.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    if (data.length === 0)
      return res.status(400).send("Institution not found with " + id);

    res.send(data);
  });
});
// create status
router.post("/", uploads.single("logo"), async (req, res) => {
  const { name, code, email, telephone, phoneNumber, location } = req.body;

  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });
  //
  const status = new Institution({
    name,
    code,
    email,
    phoneNumber,
    telephone,
    location,
    logo: req.file.filename,
  });
  Institution.create(status, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  // validation

  if (!req.body) return res.status(400).send("body cannot be empty");
  const { id } = req.params;
  Institution.findByIdAndUpdate(id, new Institution(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res
            .status(400)
            .send({ message: "Institution not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  Institution.findByIdAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("institution not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
