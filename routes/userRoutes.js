const express = require("express");
const { userRegister, userLogin, userInfo } = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/current").get(validateToken, userInfo);
module.exports = router;