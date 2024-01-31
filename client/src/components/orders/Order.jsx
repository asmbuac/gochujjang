import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

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

const Value = styled.span`
  text-transform: capitalize;
`;

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

const Order = ({ order }) => {
  const params = useParams().id;

  return (
    <Container>
      <Details>
        <Row>
          <Field>Order Number</Field>
          <Value>{order?._id}</Value>
        </Row>
        <Row>
          <Field>Date Placed</Field>
          {!params ? (
            <Value>{new Date(order?.createdAt).toLocaleDateString()}</Value>
          ) : (
            <Value>
              {new Date(order?.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Value>
          )}
        </Row>
        <Row>
          <Field>Order Status</Field>
          <Value>{order?.status}</Value>
        </Row>
        <Row>
          <Field>Total</Field>
          <Value>${order?.amount}</Value>
        </Row>
      </Details>
      {!params && (
        <ButtonContainer>
          <Button type="button" $bg="transparent" $color="black">
            Support
          </Button>
          <Link to={`/account/orders/${order?._id}`}>
            <Button type="button" $bg="black" $color="white">
              Details
            </Button>
          </Link>
        </ButtonContainer>
      )}
    </Container>
  );
};

export default Order;
