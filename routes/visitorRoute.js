const vehicleController = require("../controllers/visitorController");

const router = require("express").Router();

router.get("/", vehicleController.getVisitors);
router.get("/:id", vehicleController.getVisitorById);
router.post("/", vehicleController.createVisitor);
router.put("/:id", vehicleController.updateVisitor);
router.delete("/:id", vehicleController.deleteVisitor);

module.exports = router;
