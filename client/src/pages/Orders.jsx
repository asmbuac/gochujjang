import styled from "styled-components";
import Order from "../components/Order";

const Title = styled.h1`
  margin-bottom: 30px;
  text-transform: uppercase;
  font-weight: 900;
`;

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Orders = () => {
  return (
    <>
      <Title>My Orders</Title>
      <OrdersContainer>
        <Order />
        <Order />
      </OrdersContainer>
    </>
  );
};

export default Orders;
