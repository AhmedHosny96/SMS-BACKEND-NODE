const destinationController = require("../controllers/destinationController");

const router = require("express").Router();

router.get("/", destinationController.getDestinations);
router.get("/:schoolId", destinationController.getDestinationsBySchool);
router.get("/id/:id", destinationController.getDestinationById);
router.post("/", destinationController.createDestination);
router.put("/:id", destinationController.updateDestination);
router.delete("/:id", destinationController.deleteDestination);

module.exports = router;
