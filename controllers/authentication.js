const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const register = async (req, res) => {
  const saltRounds = 10;
  const { userName, email, password, confirmPassword } = req.body;

  try {
    // check if user already exists with the same email
    const alreadyExists = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { userName: userName }],
      },
    });
    if (alreadyExists) {
      return res
        .status(403)
        .json({ message: "Email or Username already exists!!" });
    } else if (confirmPassword != password) {
      return res.status(403).json({ message: "Passwords don't match!" });
    } else {
      // hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      //create new user
      const newUser = await User.create({
        userName: userName,
        email: email.toLowerCase(),
        password: hash,
      });

      //save user
      const savedUser = await newUser.save();

      return res.status(201).json(savedUser);
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: true, message: `there was an error: ${err.message}` });
  }
};

const login = async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  try {
    // find user by userName
    const user = await User.findOne({
      where: { userName: userName },
      attributes: ["id", "userName", "email", "password", "googleUserId"],
    });
    if (user === null) {
      res.status(401).json({ error: true, message: "Invalid Credentials" });
    } else {
      if (
        (password && (await bcrypt.compare(password, user.password)))
      ) {
        // create a jwt token
        const accessToken = jwt.sign(user.dataValues, process.env.SECRET);
        const resp = {
          message: "loggedIn",
          accessToken: accessToken,
          user,
        };

        return res.status(200).json(resp);
      } else {
        res.status(400).json({ error: true, message: "Invalid Credentials!" });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: `there was an error: ${err.message}` });
  }
};

module.exports = { register, login };
