const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slide", SlideSchema);
