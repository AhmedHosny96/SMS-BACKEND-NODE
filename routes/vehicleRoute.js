const vehicleController = require("../controllers/vehicleController");

const router = require("express").Router();

router.get("/", vehicleController.getVehicles);
router.get("/:schoolId", vehicleController.getVehicleBySchool);
router.get("/id/:id", vehicleController.getVehicleById);
router.post("/", vehicleController.createAsset);
router.put("/:id", vehicleController.updateVehicle);
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;
