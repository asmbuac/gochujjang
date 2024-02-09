const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    categories: {
      type: Array,
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

ProductSchema.pre("aggregate", function (next) {
  this.pipeline().unshift(
    {
      $lookup: {
        from: "artists",
        localField: "artist",
        foreignField: "_id",
        as: "artist",
      },
    },
    {
      $unwind: {
        path: "$artist",
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        image: 1,
        artist: "$artist.name",
        categories: 1,
        size: 1,
        color: 1,
        price: 1,
        inStock: 1,
        createdAt: 1,
      },
    },
  );
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
