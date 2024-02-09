const express = require("express");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const slideRoute = require("./routes/slide");
const wishlistRoute = require("./routes/wishlist");
const artistRoute = require("./routes/artist");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/slides", slideRoute);
app.use("/api/wishlists", wishlistRoute);
app.use("/api/artists", artistRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Backend server is running!");
});
