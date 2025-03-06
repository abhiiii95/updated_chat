const express = require("express");
const router = express.Router();

const { Register, Login, userInfo, completeUserProfile } = require("../controllers/authController");
const { Auth } = require("../middlewares/Auth");
const { uploadProfileImage } = require("../middlewares/uploadProfileImage");


router.post("/register", Register);
router.post("/login", Login);
router.get("/userInfo", Auth, userInfo)
router.post("/updateUserProfile", Auth, uploadProfileImage, completeUserProfile)


module.exports = router;
