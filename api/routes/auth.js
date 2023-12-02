const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// SIGNUP
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_KEY
    ).toString(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: req.body?.avatar,
    isAdmin: req.body?.isAdmin,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      const errMsg =
        duplicateField === "username"
          ? "Username already exists"
          : "Email already exists";
      res.status(400).json(errMsg);
    } else {
      res.status(400).json(err);
    }
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("User does not exist");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_KEY
    );
    const ogPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    ogPassword !== req.body.password &&
      res.status(400).json("Incorrect password");

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
