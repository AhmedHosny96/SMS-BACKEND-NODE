const termController = require("../controllers/termController");

const router = require("express").Router();

router.get("/", termController.getTerms);
router.get("/:id", termController.getTermById);
router.post("/", termController.createTerm);
router.put("/:id", termController.updateTerm);
router.delete("/:id", termController.deleteTerm);

module.exports = router;
