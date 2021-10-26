const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const register = async (req, res) => {
  const saltRounds = 10;
  const { userName, email, password } = req.body;

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

      return res.redirect("/");
    }
  } catch (err) {
    res.status(500).json({ message: `there was an error: ${err.message}` });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    // find user by userName
    const user = await User.findOne({
      where: { userName: userName },
    });

    if (user === null) {
      res.status(400).send("Invalid Credentials");
    } else {
      if (await bcrypt.compare(password, user.password)) {
        // create a jwt token
        const accessToken = jwt.sign(user.dataValues, process.env.SECRET);

        // set cookie
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
        });

        res.status(200).json({
          message: "loggedIn",
          accessToken: accessToken,
          user,
        });
      } else {
        res.status(400).send("Invalid Credentials!");
      }
    }
  } catch (err) {
    res.status(500).json({ message: `there was an error: ${err.message}` });
  }

  // return res.status(200).json({ message: "login" });
};

module.exports = { register, login };
