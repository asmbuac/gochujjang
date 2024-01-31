import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useGetOrderByIdQuery } from "../redux/orderApi";
import axios from "axios";
import { useSelector } from "react-redux";
import OrderDetails from "../components/orders/Order";
import PaymentDetails from "../components/order/PaymentDetails";
import Products from "../components/order/Products";

const ReturnContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  width: fit-content;
  color: black;
`;

const ReturnIcon = styled(KeyboardBackspace)`
  width: 14px !important;
  height: 14px !important;
`;

const ReturnText = styled.span`
  font-size: 12px;
  text-decoration: underline;
  text-underline-position: under;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  text-transform: uppercase;
  font-weight: 900;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Order = () => {
  const orderId = useParams().id;
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);
  const token = useSelector((state) => state.auth.currentUser?.token);
  const [stripeSesh, setStripeSesh] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const getCheckoutSession = async () => {
      try {
        if (!order) return;

        const res = await axios.get(
          `http://localhost:8000/api/checkout/${order?.sessionId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );

        if (res.data) {
          setStripeSesh(res.data);
          setError("");
        }
      } catch (err) {
        setError(err);
      }
    };

    getCheckoutSession();
  }, [order]);

  return (
    <>
      <ReturnContainer to="/account/orders">
        <ReturnIcon />
        <ReturnText>Return to orders</ReturnText>
      </ReturnContainer>
      <Title>Order Details</Title>
      {isLoading ? (
        "Loading..."
      ) : (
        <OrderContainer>
          <OrderDetails order={order} stripeSesh={stripeSesh} />
          <Section>
            {!error ? (
              <PaymentDetails stripeSesh={stripeSesh} />
            ) : (
              `Unable to obtain Stripe checkout session information
              \n
              ${error}`
            )}
          </Section>
          <Section>
            <Products products={order?.products} />
          </Section>
        </OrderContainer>
      )}
    </>
  );
};

export default Order;
