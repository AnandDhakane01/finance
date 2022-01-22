const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authentication");
const { quote } = require("../controllers/quote");
const { buy } = require("../controllers/buy");
const { sell } = require("../controllers/sell");
const loginRequired = require("../middlewares/loginRequired");

/* GET home page. */
router.get("/", function (req, res) {
  return res.status(200).send("Index router");
});

// @requires
// userName
// email
// password
// confirmPassword
router.post("/register", register);

// @requires
// userName
// password
router.post("/login", login);

// @requires
// symbol
// no_of_shares
router.post("/buy", loginRequired, buy);

// @requires
// symbol
router.post("/quote", loginRequired, quote);

// @requited
// symbol
// no_of_shares
router.post("/sell", loginRequired, sell);

module.exports = router;
