import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
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
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    font-weight: bold;
  }
`;

const Field = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: gray;
`;

const Value = styled.span``;

const ButtonContainer = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 8px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid;
  border-color: black;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Order = () => {
  return (
    <Container>
      <Details>
        <Row>
          <Field>Order Number</Field>
          <Value>FDS789FDS78</Value>
        </Row>
        <Row>
          <Field>Date Placed</Field>
          <Value>Jan 28, 2024</Value>
        </Row>
        <Row>
          <Field>Order Status</Field>
          <Value>Fulfilled</Value>
        </Row>
        <Row>
          <Field>Total</Field>
          <Value>$29.99</Value>
        </Row>
      </Details>
      <ButtonContainer>
        <Button type="button" $bg="transparent" $color="black">
          Support
        </Button>
        <Link to="/account/orders/1">
          <Button type="button" $bg="black" $color="white">
            Details
          </Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

export default Order;
