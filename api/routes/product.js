const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const product = new Product(req.body);

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "artist",
      "name"
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const { new: qNew, category: qCategory, artist: qArtist } = req.query;

  try {
    let pipeline = [];

    if (qCategory) {
      pipeline.push({
        $match: {
          categories: {
            $regex: qCategory,
            $options: "i",
          },
        },
      });
    }
    if (qArtist) {
      pipeline.push(
        {
          $match: {
            artist: {
              $regex: qArtist,
              $options: "i",
            },
          },
        },
        {
          $project: { artist: 0 },
        }
      );
    }
    if (qNew) {
      pipeline.push(
        {
          $sort: { createdAt: -1 },
        },
        {
          $limit: 6,
        }
      );
    }

    const products = await Product.aggregate(pipeline);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
