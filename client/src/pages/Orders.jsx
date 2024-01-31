import styled from "styled-components";
import Order from "../components/orders/Order";
import { useGetOrdersQuery } from "../redux/orderApi";
import { useSelector } from "react-redux";

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
  const userId = useSelector((state) => state.auth.currentUser?._id);
  const { data: orders, isLoading } = useGetOrdersQuery(userId);

  return (
    <>
      <Title>My Orders</Title>
      <Container>
        {isLoading
          ? "Loading"
          : orders?.map((order) => <Order key={order?._id} order={order} />)}
      </Container>
    </>
  );
};

export default OrderList;
