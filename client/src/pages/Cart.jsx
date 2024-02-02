import styled from "styled-components";
import { mobile, md, lg } from "../responsive";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { publicRequest } from "../requestMethods";
import { useState } from "react";
import Alert from "../components/ui/Alert";
import { ErrorOutline } from "@mui/icons-material";

const Container = styled.div``;

const Wrapper = styled.div`
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid black;
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  transition: all 400ms ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const TopTexts = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 10px;
  ${mobile({ fontSize: "14px" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    color: #7487bf;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${lg({ flexDirection: "column", marginBottom: "10px" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: black;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 400ms ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Break = styled.br``;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    try {
      const res = await publicRequest.post("/checkout", { cart });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={handleCheckout}>
            CHECKOUT NOW
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>-$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleCheckout}>CHECKOUT</Button>
            {error && (
              <Alert icon={ErrorOutline} margin="10px 0 0" color="crimson">
                Unable to checkout
                <Break />
                {error}
              </Alert>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
