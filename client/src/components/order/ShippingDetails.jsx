import styled from "styled-components";

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

const Shipping = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Value = styled.span`
  &::first-letter {
    text-transform: capitalize;
  }
`;

const ShippingDetails = ({ stripeSesh }) => {
  const {
    name = "",
    address: { line1, line2, city, state, postal_code, country } = {},
  } = stripeSesh?.shipping_details || {};
  const shippingCost = stripeSesh?.shipping_cost || "Free";
  const trackingNum = stripeSesh?.payment_intent?.shipping?.tracking_number;

  return (
    <>
      <Header>Shipping</Header>
      <Details>
        <Row>
          <Field>Shipped To</Field>
          <Shipping>
            <Value>{name}</Value>
            <Value>{line1}</Value>
            {line2 && <Value>{line2}</Value>}
            <Value>
              {city}, {state} {postal_code}
            </Value>
            <Value>{country}</Value>
          </Shipping>
        </Row>
        <Row>
          <Field>Method</Field>
          <Value>Standard</Value>
        </Row>
        <Row>
          <Field>Cost</Field>
          <Value>{shippingCost}</Value>
        </Row>
        <Row>
          <Field>Tracking Number</Field>
          <Value>{trackingNum}</Value>
        </Row>
      </Details>
    </>
  );
};

export default ShippingDetails;
