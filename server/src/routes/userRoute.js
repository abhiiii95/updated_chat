const express = require("express");
const router = express.Router();

const { Register, Login, userInfo } = require("../controllers/authController");
const { Auth } = require("../middlewares/Auth");


router.post("/register", Register);
router.post("/login", Login);
router.get("/userInfo", Auth, userInfo)


module.exports = router;
