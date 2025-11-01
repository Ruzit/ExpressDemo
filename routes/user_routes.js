const express = require("express");
const { getUserList, addUser, updateUserData, deleteUserData, getUserById } = require("../controllers/user_controller");
const router = express.Router();

router.get("/", getUserList);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUserData);
router.delete("/:id",deleteUserData);

module.exports = router;
