import styled from "styled-components";
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import Marquee from "../components/Marquee";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
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
  background-color: ${props => props.type === "filled" ? "black" : "transparent"};
  color: ${props => props.type === "filled" && "white"};
  transition: all 400ms ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
  margin: 0px 10px;
  transition: all 300ms ease;

  &:hover {
    color: #7487BF;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-transform: uppercase;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

const ProductAmount = styled.span`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.span`
  font-size: 24px;
  font-weight: 200;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "500"};
  font-size: ${props => props.type === "total" && "24px"};
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

const Cart = () => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Marquee />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag (2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetails>
                <Image src="https://saranghello.com/cdn/shop/products/1_e16dc4ae-884c-4050-b96a-79548a9ce0ff_900x.jpg?v=1667762979" />
                <Details>
                  <ProductName><b>Product: </b>BLACKPINK - Official Light Stick Version 2</ProductName>
                  <ProductId><b>ID: </b>93813718293</ProductId>
                  <ProductColor color="black" />
                  <ProductSize><b>Size: </b>N/A</ProductSize>
                </Details>
              </ProductDetails>
              <PriceDetails>
                <ProductAmountContainer>
                  <Remove />
                  <ProductAmount>2</ProductAmount>
                  <Add />
                </ProductAmountContainer>
                <ProductPrice>$131.98</ProductPrice>
              </PriceDetails>
            </Product>
            <Product>
              <ProductDetails>
                <Image src="https://saranghello.com/cdn/shop/products/e3323ba0-bad4-46d3-8884-e2a5ce1bf812_750x.jpg?v=1678745716" />
                <Details>
                  <ProductName><b>Product: </b>Jisoo (BLACKPINK) - 1st Single Album + YG Select Benefits</ProductName>
                  <ProductId><b>ID: </b>93813718293</ProductId>
                  <ProductColor color="black" />
                  <ProductSize><b>Size: </b>N/A</ProductSize>
                </Details>
              </ProductDetails>
              <PriceDetails>
                <ProductAmountContainer>
                  <Remove />
                  <ProductAmount>1</ProductAmount>
                  <Add />
                </ProductAmountContainer>
                <ProductPrice>$27.99</ProductPrice>
              </PriceDetails>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$120</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>-$65.99</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$93.98</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Cart;
