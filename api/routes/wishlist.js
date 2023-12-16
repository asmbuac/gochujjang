const Wishlist = require("../models/Wishlist");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./verifyToken");

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

// UPDATE
router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedWishlist);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE
router.delete("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ userId: req.params.userId });
    res.status(200).json("User's wishlist has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET WISHLIST
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      userId: req.params.userId,
    }).populate("products");
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL WISHLISTS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(200).json(wishlists);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
