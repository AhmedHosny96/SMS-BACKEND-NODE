const messageController = require("../controllers/messageController");

const router = require("express").Router();

router.get("/", messageController.getMessages);
router.get("/:id", messageController.getMessageById);
router.get("/unread/:userId", messageController.retrieveUnreadMessagesByUserId);
router.post("/", messageController.createMessage);
router.put("/:id", messageController.updateMessage);
router.delete("/:id", messageController.deleteMessage);

module.exports = router;
