import styled from "styled-components";

const Header = styled.h2`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 10px;
`;

const DetailsContainer = styled.div`
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: ${({ $fw }) => $fw};

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

const Value = styled.span`
  &::first-letter {
    text-transform: capitalize;
  }
`;

const BillingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
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

  return (
    <>
      <Header>Payment</Header>
      <DetailsContainer>
        <Details>
          <Row>
            <Field>Billed To</Field>
            <BillingContainer>
              <Value>{name}</Value>
              <Value>{line1}</Value>
              {line2 && <Value>{line2}</Value>}
              <Value>
                {city}, {state} {postal_code}
              </Value>
              <Value>{country}</Value>
              <Value>Email: {email}</Value>
              {phone && <Value>Phone: {phone}</Value>}
            </BillingContainer>
          </Row>
          <Row>
            <Field>Method</Field>
            <Value>
              {card
                ? `${card?.brand} ending in ${card?.last4}`
                : paymentMethods?.reduce(
                    (methods, method) => methods + `\n${method}`
                  )}
            </Value>
          </Row>
          <Row>
            <Field>Status</Field>
            <Value>{stripeSesh?.payment_status}</Value>
          </Row>
        </Details>
      </DetailsContainer>
    </>
  );
};

export default PaymentDetails;
