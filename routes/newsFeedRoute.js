const newsFeedController = require("../controllers/newsFeedController");

const router = require("express").Router();

router.get("/", newsFeedController.getNewsfeed);
router.get("/:id", newsFeedController.getNewsfeedById);
router.post("/", newsFeedController.createNewfeed);
router.put("/:id", newsFeedController.updateNewsfeed);
router.delete("/:id", newsFeedController.deleteDestination);

module.exports = router;
