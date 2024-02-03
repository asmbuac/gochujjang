import DetailsSection from "../ui/DetailsSection";

const PaymentDetails = ({ stripeSesh }) => {
  const {
    name = "",
    address: { line1, line2, city, state, postal_code, country } = {},
    email = "",
    phone = "",
  } = stripeSesh?.payment_intent?.payment_method?.billing_details || {};
  const card = stripeSesh?.payment_intent?.payment_method?.card;
  const paymentMethods = stripeSesh?.payment_intent?.payment_method_types;

  const details = [
    {
      field: "Billed To",
      value: {
        name,
        line1,
        line2: line2 && line2,
        cityStatePostal: `${city} ${state}
        ${postal_code}`,
        country,
        email: `Email: ${email}`,
        phone: phone && `Phone: ${phone}`,
      },
    },
    {
      field: "Method",
      value: card
        ? `${card?.brand} ending in ${card?.last4}`
        : paymentMethods?.reduce((methods, method) => methods + `\n${method}`),
    },
    { field: "Status", value: stripeSesh?.payment_status },
  ];

  return <DetailsSection header="Payment" details={details} />;
};

export default PaymentDetails;
