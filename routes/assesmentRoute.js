const assesmentController = require("../controllers/assesmentController");

const router = require("express").Router();

router.get("/", assesmentController.getAssesments);
router.get("/:id", assesmentController.getAssesmentById);
router.post("/", assesmentController.createAssesment);
router.put("/:id", assesmentController.updateAssesment);
router.delete("/:id", assesmentController.deleteAssesment);

module.exports = router;
