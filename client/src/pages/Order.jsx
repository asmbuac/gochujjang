import styled from "styled-components";
import { Link } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";

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

const Header = styled.h2`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 10px;
`;

const DetailsContainer = styled.div`
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: ${({ $fw }) => $fw};

  &:last-child {
    border-bottom: none;
  }
`;

const ImageAndTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Field = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: gray;
`;

const Value = styled.span`
  white-space: pre-line;
`;

const Artist = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: gray;
  letter-spacing: 1px;
`;

const ProductName = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const ItemNum = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

const PriceAndQuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
`;

const Quantity = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

const Order = () => {
  return (
    <>
      <ReturnContainer to="/account/orders">
        <ReturnIcon />
        <ReturnText>Return to orders</ReturnText>
      </ReturnContainer>
      <Title>Order Details</Title>
      <OrderContainer>
        <Section>
          <DetailsContainer>
            <Details>
              <Row>
                <Field>Order Number</Field>
                <Value>FDS789FDS78</Value>
              </Row>
              <Row>
                <Field>Date Placed</Field>
                <Value>Jan 28, 2024</Value>
              </Row>
              <Row>
                <Field>Payment Status</Field>
                <Value>Paid</Value>
              </Row>
              <Row>
                <Field>Order Status</Field>
                <Value>Fulfilled</Value>
              </Row>
              <Row $fw="bold">
                <Field>Total</Field>
                <Value>$29.99</Value>
              </Row>
            </Details>
          </DetailsContainer>
        </Section>
        <Section>
          <Header>Payment Details</Header>
          <DetailsContainer>
            <Details>
              <Row>
                <Field>Billed To</Field>
                <Value>{"Shayne Buac\n99999 Jjang Ave\nJjang, CA 99999"}</Value>
              </Row>
              <Row>
                <Field>Payment Method </Field>
                <Value>Visa ending in 4242</Value>
              </Row>
            </Details>
          </DetailsContainer>
        </Section>
        <Section>
          <Header>Products Ordered</Header>
          <DetailsContainer>
            <Details>
              <Row>
                <ImageAndTextContainer>
                  <ImageContainer>
                    <Image src="https://m.media-amazon.com/images/I/610uvq3MxeL.__AC_SX300_SY300_QL70_FMwebp_.jpg" />
                  </ImageContainer>
                  <TextContainer>
                    <Artist>BLACKPINK</Artist>
                    <ProductName>
                      BLACKPINK - Official Light Stick Version 2
                    </ProductName>
                    <ItemNum>Item No. 65838fae6248f265ec50dec3</ItemNum>
                  </TextContainer>
                </ImageAndTextContainer>
                <PriceAndQuantityContainer>
                  <Price>$65.99</Price>
                  <Quantity>QTY: 1</Quantity>
                </PriceAndQuantityContainer>
              </Row>
              <Row>
                <ImageAndTextContainer>
                  <ImageContainer>
                    <Image src="https://m.media-amazon.com/images/I/610uvq3MxeL.__AC_SX300_SY300_QL70_FMwebp_.jpg" />
                  </ImageContainer>
                  <TextContainer>
                    <Artist>BLACKPINK</Artist>
                    <ProductName>
                      BLACKPINK - Official Light Stick Version 2
                    </ProductName>
                    <ItemNum>Item No. 65838fae6248f265ec50dec3</ItemNum>
                  </TextContainer>
                </ImageAndTextContainer>
                <PriceAndQuantityContainer>
                  <Price>$65.99</Price>
                  <Quantity>QTY: 1</Quantity>
                </PriceAndQuantityContainer>
              </Row>
              <Row>
                <ImageAndTextContainer>
                  <ImageContainer>
                    <Image src="https://m.media-amazon.com/images/I/610uvq3MxeL.__AC_SX300_SY300_QL70_FMwebp_.jpg" />
                  </ImageContainer>
                  <TextContainer>
                    <Artist>BLACKPINK</Artist>
                    <ProductName>
                      BLACKPINK - Official Light Stick Version 2
                    </ProductName>
                    <ItemNum>Item No. 65838fae6248f265ec50dec3</ItemNum>
                  </TextContainer>
                </ImageAndTextContainer>
                <PriceAndQuantityContainer>
                  <Price>$65.99</Price>
                  <Quantity>QTY: 1</Quantity>
                </PriceAndQuantityContainer>
              </Row>
            </Details>
          </DetailsContainer>
        </Section>
      </OrderContainer>
    </>
  );
};

export default Order;
