const express = require("express");
const router = express.Router();

const { Register, Login, userInfo, completeUserProfile } = require("../controllers/authController");
const { Auth } = require("../middlewares/Auth");


router.post("/register", Register);
router.post("/login", Login);
router.get("/userInfo", Auth, userInfo)
router.post("/updateUserProfile", Auth, completeUserProfile)


module.exports = router;
