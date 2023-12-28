const Artist = require("../models/Artist");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const artist = new Artist(req.body);

  try {
    const savedArtist = await artist.save();
    res.status(201).json(savedArtist);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedArtist);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Artist.findByIdAndDelete(req.params.id);
    res.status(200).json("Artist has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ARTISTS
router.get("/", async (req, res) => {
  let { type, name } = req.query;
  if (type && !Array.isArray(type)) {
    type = [type];
  }

  try {
    let pipeline = [];

    if (type) {
      pipeline.push({
        $match: { type: { $in: type } },
      });
    }
    if (name) {
      pipeline.push({
        $match: {
          name: {
            $regex: name,
            $options: "i",
          },
        },
      });
    }
    if (!pipeline.length) {
      pipeline.push({ $match: {} });
    }

    pipeline.push({ $sort: { name: 1 } });
    const artists = await Artist.aggregate(pipeline, {
      collation: { locale: "en" },
    });
    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
