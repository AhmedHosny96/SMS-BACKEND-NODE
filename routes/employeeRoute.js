const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const employeeController = require("../controllers/employeeController");

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// multer storage

const uploads = multer({
  storage: uploadStorage,
  limits: {
    fieldSize: 1024 * 1024 * 10,
  },
});

router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployees);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;

//
