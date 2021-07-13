const express = require("express");
const router = express.Router();

const chat_controller = require("./controllers/chatController");

router.get("/chat", chat_controller.get);
router.get("/chat_chat", chat_controller.getAll);


module.exports = router;