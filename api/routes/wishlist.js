const Wishlist = require("../models/Wishlist");
const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const wishlist = new Wishlist(req.body);

  try {
    const savedWishlist = await wishlist.save();
    res.status(201).json(savedWishlist);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
