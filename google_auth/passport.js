const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { login } = require("../controllers/authentication");
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID, // Your Credentials here.
      clientSecret: process.env.OAUTH_CLIENT_SECRET, // Your Credentials here.
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const data = profile;
      const alreadyExists = await User.findOne({
        where: { email: data.email },
      });

      userObj = {
        userName: data.displayName,
        email: data.email,
        googleUserId: data.id,
        profilePic: data.picture,
      };

      if (!alreadyExists) {
        const newUser = await User.create(userObj);
        await newUser.save();
      } else {
        await User.update(userObj, {
          where: {
            email: data.email,
          },
        });
      }
      request.body = userObj;

      // create jwt
      const login_resp = await login(request, null, userObj);
      return done(null, login_resp);
    }
  )
);
