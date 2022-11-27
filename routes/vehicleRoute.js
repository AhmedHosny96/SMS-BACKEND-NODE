const vehicleController = require("../controllers/vehicleController");

const router = require("express").Router();

router.get("/", vehicleController.getVehicles);
router.get("/:id", vehicleController.getVehicleById);
router.post("/", vehicleController.createAsset);
router.put("/:id", vehicleController.updateVehicle);
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;
