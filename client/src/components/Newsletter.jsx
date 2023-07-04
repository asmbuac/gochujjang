import { Send } from '@mui/icons-material';
import styled from 'styled-components';
import { mobile } from "../responsive";

const Container = styled.div`
  height: 40vh;
  background-color: #eae7f4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  ${mobile({ height: "45vh" })}
`;

const Title = styled.h1`
  font-size: 36px;
  text-transform: uppercase;
  margin-bottom: 20px;
  ${mobile({ fontSize: "30px" })}
`;

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ fontSize: "18px" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  font-size: 16px;
  border: none;
  outline: none;
  flex: 8;
  padding-left: 20px;
  ${mobile({ fontSize: "14px" })}
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #8774bf;
  color: white;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background-color: #312a90;
  }
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Become a member and get 15% off your next purchase</Title>
      <Description>Get the latest news and updates on new products and more!</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
