import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCart } from "../redux/cartSlice";
import { publicRequest } from "../requestMethods";
import { useCreateOrderMutation } from "../redux/orderApi";

const Container = styled.div`
  width: 100%;
  height: 40vh;
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
  const url = new URL(window.location);
  const sessionId = url.searchParams.get("session_id");
  const [session, setSession] = useState({});
  const [createOrder] = useCreateOrderMutation();

  const getSession = async () => {
    try {
      const res = await publicRequest.get(`/checkout/${sessionId}`);
      setSession(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSession();
    if (session.status === "complete") {
      const products = cart.products.map(({ _id, quantity }) => ({
        product: _id,
        quantity,
      }));
      const address = session?.shipping_details?.address;
      const fullAddress = `${address?.line1}, ${address?.city}, ${address?.state} ${address?.postal_code}`;
      createOrder({
        userId,
        products,
        amount: cart.total,
        address: fullAddress ? fullAddress : "",
        sessionId,
      });
    }
    if (cart.products.length > 0) {
      dispatch(deleteCart());
    }
  }, [sessionId]);

  return (
    <Container>
      <Logo src="src/assets/logo.png" />
      <Button>Successful</Button>
      <SuccessMsg>
        Your order is being prepared. Thanks for choosing K-SHOP!
      </SuccessMsg>
    </Container>
  );
}

export default Success;
