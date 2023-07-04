const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

// SIGNUP
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json(err);
  }

});

module.exports = router;
