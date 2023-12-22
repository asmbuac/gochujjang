import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCart } from "../redux/cartSlice";
import { publicRequest } from "../requestMethods";
import {
  useCreateOrderMutation,
  useGetOrderBySessionQuery,
} from "../redux/orderApi";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  height: 40vh;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Logo = styled.img`
  width: 60px;
`;

const Button = styled.button`
  padding: 20px 30px;
  background-color: #74acbf;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 15px;
`;

const SuccessMsg = styled.p`
  font-size: 18px;
  ${mobile({ textAlign: "center", padding: "0px 5px" })}
`;

function Success() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.currentUser?._id);
  const sessionId = useLocation().search.slice(12);
  const { data } = useGetOrderBySessionQuery(sessionId);
  const [createOrder, { isSuccess, reset }] = useCreateOrderMutation();

  useEffect(() => {
    if (data?.length > 0) {
      return;
    }

    const makeOrder = async () => {
      try {
        const res = await publicRequest.get(`/checkout/${sessionId}`);
        const session = res.data;
        if (session?.status === "complete") {
          const products = cart.products.map(({ _id, quantity }) => ({
            product: _id,
            quantity,
          }));
          const address = session?.shipping_details?.address;
          const fullAddress = `${address?.line1}, ${address?.city}, ${address?.state} ${address?.postal_code}`;
          createOrder({
            userId,
            products,
            amount: parseFloat(cart.total.toFixed(2)),
            address: fullAddress?.length > 0 ? fullAddress : "",
            sessionId,
            email: session?.customer_details.email,
          });
          if (cart.products.length > 0) {
            dispatch(deleteCart());
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    makeOrder();
  }, [sessionId, data]);

  return (
    <Container>
      <Logo src="src/assets/logo.png" />
      <Button>Successful</Button>
      <SuccessMsg>
        Your order is being prepared. Thanks for choosing Jjang!
      </SuccessMsg>
    </Container>
  );
}

export default Success;
