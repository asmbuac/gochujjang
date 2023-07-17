const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

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

  const session = await stripe.checkout.sessions.create({
    line_items: cartItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cart",
    automatic_tax: { enabled: true },
  });

  res.json({ url: session.url });
});

module.exports = router;
