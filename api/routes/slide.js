const Slide = require("../models/Slide");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const slide = new Slide(req.body);

  try {
    const savedSlide = await slide.save();
    res.status(201).json(savedSlide);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedSlide = await Slide.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedSlide);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET ALL SLIDES
router.get("/", async (req, res) => {
  try {
    const slides = await Slide.find();
    res.status(200).json(slides);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SLIDE
router.get("/:id", async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    res.status(200).json(slide);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE SLIDE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Slide.findByIdAndDelete(req.params.id);
    res.status(200).json("Slide has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
