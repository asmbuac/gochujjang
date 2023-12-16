const Slide = require("../models/Slide");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const slide = new Slide(req.body);

  try {
    const savedSlide = await slide.save();
    res.status(200).json(savedSlide);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
