import styled from "styled-components";
import DetailsSection from "../ui/DetailsSection";

const Header = styled.h2`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Details = styled.div`
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
`;

const Row = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const Field = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: gray;
`;

const Billing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Value = styled.span`
  &::first-letter {
    text-transform: capitalize;
  }
`;

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
