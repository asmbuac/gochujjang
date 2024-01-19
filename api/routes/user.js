const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");

const router = require("express").Router();

// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json("User does not exist");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_KEY
    );
    const ogPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (ogPassword !== req.body.oldPassword) {
      return res.status(400).json("Incorrect password");
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json("Passwords do not match");
    }

    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
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

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
