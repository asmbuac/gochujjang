import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -90px;
`;

const Logo = styled.img`
  width: 60px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px 5px 0px;
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
`;

const Button = styled.button`
  margin: 15px 0px 10px 0px;
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #7487BF;
  color: white;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background-color: #183888;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Link = styled.a`
  margin: 10px 0px;
  font-size: 12px;
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    color: #7487BF;
  }
`;

const Login = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <Logo src="src/assets/logo.png" />
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input placeholder="Username or Email" type="text" required />
            <Input placeholder="Password" type="password" required />
            <Button>LOGIN</Button>
            <LinkContainer>
              <Link>FORGOT PASSWORD?</Link>
              <Link>CREATE A NEW ACCOUNT</Link>
            </LinkContainer>
          </Form>
        </Wrapper>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Login;
