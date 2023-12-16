const parentController = require("../controllers/parentController");

const router = require("express").Router();

// router.get("/", parentController.getParents);
router.get("/:schoolId", parentController.getParentsBySchool);
router.get("/:schoolId/id/:id", parentController.getParentById);
router.post("/", parentController.createParent);
router.put("/:schoolId/update/:id", parentController.updateParent);
router.delete("/:id", parentController.deleteParent);

module.exports = router;
