const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authentication");
const { buy } = require("../controllers/buy");

const {
  registerInitialChecks,
  loginInitialChecks,
} = require("../middlewares/authentication");

const loginRequired = require("../middlewares/loginRequired");

/* GET home page. */
router.get("/", function (req, res) {
  return res.status(200).send("Index router");
});

router.post("/register", register);

router.post("/login", login);

router.post("/buy", loginRequired, buy);

module.exports = router;
