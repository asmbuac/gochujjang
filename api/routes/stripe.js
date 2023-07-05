const router = require("express").Router();
const stripe = require("stripe")("sk_test_51NQGOLIAANtxApxuMAjZanuEroXqfWfPiNIbvRFkiCLJH4Ro1IXCGKovgNqoT1BhpINoDsZcbDRAt7JaURpMKA9f00DxR1UlSP");

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
