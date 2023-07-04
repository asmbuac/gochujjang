import styled from "styled-components";
import StripeCheckout from 'react-stripe-checkout';

const KEY = "pk_test_51NQGOLIAANtxApxuZUDdQGAWuyxwC1fQfM1hAg72HnaREmSJ7lUbDUrXxJwpj3zxOLCQJyXjaiOicBVISd0DhnEK00mDPYGqr5";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 30px 40px;
  background-color: black;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background-color: #7487bf;
  }
`;

function Pay() {
  const onToken = (token) => {
    console.log(token);
  };

  return (
    <Container>
      <StripeCheckout
        name="K-SHOP"
        image="src/assets/logo.png"
        billingAddress
        shippingAddress
        description="Your total is $20"
        amount={2000}
        token={onToken}
        stripeKey={KEY}
      >
        <Button>Pay Now</Button>
      </StripeCheckout>
    </Container>
  );
}

export default Pay;
