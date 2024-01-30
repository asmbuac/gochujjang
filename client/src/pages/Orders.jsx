import styled from "styled-components";
import Order from "../components/Order";

const Title = styled.h1`
  margin-bottom: 30px;
  text-transform: uppercase;
  font-weight: 900;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OrderList = () => {
  return (
    <>
      <Title>My Orders</Title>
      <Container>
        <Order />
        <Order />
      </Container>
    </>
  );
};

export default OrderList;
