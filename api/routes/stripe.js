const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { verifyTokenAndAuthorization } = require("./verifyToken");

// CREATE SESSION
router.post("/", async (req, res) => {
  const { cart } = req.body;

  const cartItems = cart?.products?.map(
    ({ _id, title, image, price, quantity }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: title,
          images: [image],
          metadata: { product_id: _id },
        },
        unit_amount: (price * 100).toFixed(0),
      },
      quantity,
    }),
  );

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: cartItems,
      mode: "payment",
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cart",
      automatic_tax: { enabled: true },
      shipping_address_collection: { allowed_countries: ["US"] },
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json(err);
  }
});

// RETRIEVE SESSION
router.get("/:sessionId", verifyTokenAndAuthorization, async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent.payment_method"],
    });
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
