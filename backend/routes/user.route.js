const express = require("express");
const router = express.Router();
const validateUserData = require("../middlewares/validate.mdw");
const {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  addUsers,
  deleteUser,
} = require("../controllers/user.controller");
const isAuth = require("../middlewares/authentication.mdw");

router.get("/", getAllUsers);
router.post("/addUsers", addUsers);
router.post("/signup", validateUserData, registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuth, logoutUser);
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;
