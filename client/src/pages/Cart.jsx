import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
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
  background-color: ${props => props.type === "filled" ? "black" : "transparent"};
  color: ${props => props.type === "filled" && "white"};
  transition: all 400ms ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

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
  ${mobile({ flexDirection: "column", marginBottom: "10px" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
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
  ${mobile({ fontSize: "14px" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid lightgray;
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

const ProductAmount = styled.input`
  font-size: 24px;
  margin: 5px;
  width: 50px;
  text-align: center;
  border: none;
  border-bottom: 2px solid black;
  padding: 10px 0px;
  outline: none;
  ${mobile({ margin: "10px 15px", textAlign: "center" })}
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
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleQuantity = (type, product) => {
    if (type === "dec") {
      dispatch(removeProduct({ ...product, quantity: 1 }));
    } else {
      dispatch(addProduct({ ...product, quantity: 1 }));
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
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product => (
              <Product key={product._id}>
                <ProductDetails>
                  <Image src={product.image} />
                  <Details>
                    <ProductName><b>Product: </b>{product.title}</ProductName>
                    <ProductId><b>ID: </b>{product._id}</ProductId>
                    <ProductColor color={product.color} />
                    {product.size && <ProductSize><b>Size: </b>{product.size}</ProductSize>}
                  </Details>
                </ProductDetails>
                <PriceDetails>
                  <ProductAmountContainer>
                    <Remove onClick={() => handleQuantity("dec", product)} style={{ cursor: "pointer" }} />
                    <ProductAmount type="number" value={product.quantity} min="1" />
                    <Add onClick={() => handleQuantity("inc", product)} style={{ cursor: "pointer" }} />
                  </ProductAmountContainer>
                  <ProductPrice>${(product.price * product.quantity).toFixed(2)}</ProductPrice>
                </PriceDetails>
              </Product>
            ))
            }
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
            <Button>CHECKOUT</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container >
  );
};

export default Cart;
