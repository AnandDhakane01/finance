const jwt = require("jsonwebtoken");

const loginRequired = async (req, res) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (token == null) {
    // return res.redirect("/login");
    res.status(401).send("Hey user, you need to be logged in first!");
  } else {
    jwt.verify(token, process.env.SECRET, (err, value) => {
      if (err) {
        return res.status(401).send("Access denied. Invalid token.");
      }
      req.user = value;
      next();
    });
  }
};

module.exports = loginRequired;
