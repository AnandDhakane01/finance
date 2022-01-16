const jwt = require("jsonwebtoken");

const loginRequired = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (token == null) {
    res
      .status(401)
      .json({ message: "Hey user, you need to be logged in first!" });
  } else {
    jwt.verify(token, process.env.SECRET, (err, value) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Access denied. Invalid token." });
      }
      req.user = value;
      next();
    });
  }
};

module.exports = loginRequired;
