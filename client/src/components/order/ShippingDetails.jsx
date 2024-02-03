import DetailsSection from "../ui/DetailsSection";

const ShippingDetails = ({ stripeSesh }) => {
  const {
    name = "",
    address: { line1, line2, city, state, postal_code, country } = {},
  } = stripeSesh?.shipping_details || {};
  const shippingCost = stripeSesh?.shipping_cost || "Free";
  const trackingNum =
    stripeSesh?.payment_intent?.shipping?.tracking_number || "";

  const details = [
    {
      field: "Shipped To",
      value: {
        name,
        line1,
        line2: line2 && line2,
        cityStatePostal: `${city} ${state}
        ${postal_code}`,
        country,
      },
    },
    { field: "Method", value: "Standard" },
    { field: "Cost", value: shippingCost },
    { field: "Tracking Number", value: trackingNum },
  ];

  return <DetailsSection header="Shipping" details={details} />;
};

export default ShippingDetails;
