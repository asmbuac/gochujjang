import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCart } from "../redux/cartSlice";

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

  useEffect(() => {
    if (cart.products.length > 0) {
      dispatch(deleteCart());
    }
  }, []);

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
