const semisterController = require("../controllers/semisterController");

const router = require("express").Router();

router.get("/", semisterController.getTerms);
router.get("/:schoolId", semisterController.getTermsBySchool);
// router.get("/:id", semisterController.getTermById);
router.post("/", semisterController.createTerm);
router.put("/:schoolId/update/:id", semisterController.updateTerm);
router.delete("/:id", semisterController.deleteTerm);

module.exports = router;
