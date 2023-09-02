const dispatchController = require("../controllers/dispatchController");

const router = require("express").Router();

router.get("/", dispatchController.getDispatches);
router.get("/:schoolId", dispatchController.getDispatchesBySchool);
router.get("/id/:id", dispatchController.getDispatchesById);
router.post("/", dispatchController.createDispatch);
router.put("/:id", dispatchController.updateDispatch);
router.delete("/:id", dispatchController.deleteDispatches);

module.exports = router;
