const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "sherry";

// create a user using Post '/api/auth/createuser'

router.post(
  "/createuser",
  [
    body("email", "Enter a valid Email Address").isEmail(),
    body("password", "Enter a valid Password, Min - 4 letters ").isLength({
      min: 4,
    }),
    body("name", "Name is too short, Enter a valid name!").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //If there are errors then throw a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // if the user email already exist
    try {
      let success = false;
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          errors: "Sorry user with this email already exist!",
        });
      }
      let salt = await bcrypt.genSalt(10);
      let secpsas = await bcrypt.hash(req.body.password, salt);
      //creating new user
      user = await User.create({
        name: req.body.name,
        password: secpsas,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occured");
    }
  }
);

//Login a user using Post '/api/auth/login'

router.post(
  "/login",
  [
    body("email", "Enter a valid Email Address").isEmail(),
    body("password", "Password cannot be blank! ").exists(),
  ],
  async (req, res) => {
    //If there are errors then throw a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let success = false;
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        res
          .status(400)
          .send({ success, error: "Please enter valid credentials" });
      }
      let userPass = await bcrypt.compare(password, user.password);
      if (!userPass) {
        success = false;
        res
          .status(400)
          .send({ success, error: "Please enter valid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ authtoken, success });
    } catch (error) {
      console.error(error.message);
    return  res.status(500).send("Some internal error occured");
    }
  }
);

//Get user  user Details using Post '/api/auth/getuser'

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});

module.exports = router;
