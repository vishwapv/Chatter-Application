const express = require("express");
const { Protect } = require("../../middleware/authmiddleware");
// const { route } = require("../userRoutes/userRoutes");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../../controller/chatController");
const router = express.Router();

router.route("/").post(Protect, accessChat);
router.route("/").get(Protect, fetchChats);
router.route("/group").post(Protect, createGroupChat);
router.route("/rename").put(Protect, renameGroup);
router.route("/groupadd").put(Protect, addToGroup);
router.route("/groupremove").put(Protect, removeFromGroup);

module.exports = router;
