const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'BLACKPINK - Official Light Stick Version 2',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/cart',
    automatic_tax: { enabled: true },
  });

  res.json({ url: session.url });
});

module.exports = router;
