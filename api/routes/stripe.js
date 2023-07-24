const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../models/Order");
const Cart = require("../models/Cart");

router.post("/", async (req, res) => {
  const cart = req.body.cart;

  const cartItems = cart.products.map(({ title, image, price, quantity }) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: title,
        images: [image],
      },
      unit_amount: (price * 100).toFixed(0),
    },
    quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: cartItems,
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/cart",
      automatic_tax: { enabled: true },
      shipping_address_collection: { allowed_countries: ["US"] },
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
