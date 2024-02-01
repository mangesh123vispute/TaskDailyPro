const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Mangeshisgood$boy";
const fetchuser = require("../middelware/fetchuser");
let success = false;
// Route 1:create a user using POST:"/api/auth/createuser" no login required

router.post(
  "/createuser",
  [
    body("email", "Email must be valid email, varify your email").isEmail(),
    body("name", "Name field is required with at least 1 charater").isLength({
      min: 1,
    }),
    body("password", "passwords should be longer than 5 char.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
      }

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({ success, errors: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      success = false;
      console.error(error.message);
      res.status(500).send(success, "Internal Server Error" + error.message);
    }
  }
);

// Route 2:Authenticating user using POST:"/api/auth/login"  login required
router.post(
  "/login",
  [
    body("email", "Email must be valid email").isEmail(),
    body("password", "password should be provided").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          errors: "Please try to login with correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          errors: "Please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);

      res.status(200).json({ success, authToken });
    } catch (err) {
      success = false;
      console.error(err.message);
      res.status(500).send(success, "Internal Server Error" + err.message);
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send("User not exist");
    }
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error " + error.message);
  }
});

module.exports = router;
