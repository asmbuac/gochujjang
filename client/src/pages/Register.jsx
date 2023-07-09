import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 130px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${mobile({ height: "calc(100vh - 100px)" })}
`;

const Logo = styled.img`
  width: 60px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid darkgray;
  outline: none;
  font-size: 16px;

  &:focus {
    border: 1px solid black;
  }

  &::placeholder {
    color: darkgray;
  }

  ${mobile({ fontSize: "14px" })}
`;

const Agreement = styled.span`
  font-size: 14px;
  margin: 20px 0px;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  height: 25px;
  width: 25px;
  cursor: pointer;
  accent-color: #B38080;
  ${mobile({ flex: "1" })}
`;

const Description = styled.p`
  ${mobile({ flex: "9" })}
`;

const Button = styled.button`
  margin-bottom: 10px;
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: rosybrown;
  color: white;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background-color: #804d4d;
  }
`;

const LinkContainer = styled.p`
  margin: 10px 0px;
  text-align: center;
  font-size: 12px;
`;

const Link = styled.a`
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    color: #804d4d;
  }
`;

const Register = () => {
  return (
    <Container>
      <Logo src="src/assets/logo.png" />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="First Name" type="text" required />
          <Input placeholder="Last Name" type="text" required />
          <Input placeholder="Username" type="text" required />
          <Input placeholder="Email" type="email" required />
          <Input placeholder="Password" type="password" required />
          <Input placeholder="Confirm Password" type="password" required />
          <Agreement>
            <Checkbox type="checkbox" required />
            <Description>
              By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
            </Description>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
        <LinkContainer>
          ALREADY HAVE AN ACCOUNT? <Link>SIGN IN</Link>
        </LinkContainer>
      </Wrapper>
    </Container>
  );
};

export default Register;
