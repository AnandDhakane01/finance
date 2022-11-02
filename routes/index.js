const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authentication");
const { quote } = require("../controllers/quote");
const { buy } = require("../controllers/buy");
const { sell } = require("../controllers/sell");
const { sellGet } = require("../controllers/sell");
const { getStocksData } = require("../controllers/portfolio");
const loginRequired = require("../middlewares/loginRequired");
const passport = require("passport");
require("../google_auth/passport");

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

// @required
// symbol
// no_of_shares
router.post("/sell", loginRequired, sell);
router.get("/sell", loginRequired, sellGet);

router.get("/stocks", loginRequired, getStocksData);

// google oauth apis
router.get("/failed", (req, res) => {
  res.status(400).json({ error: true, message: "Authentication Failed!!" });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    session: false,
  }),
  function (req, res) {
    res.json(req.user);
  }
);

module.exports = router;
