import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Marquee from "../components/Marquee";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 60vh;
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
  return (
    <>
      <Announcement />
      <Navbar />
      <Marquee />
      <Container>
        <Logo src="src/assets/logo.png" />
        <Button>Successful</Button>
        <SuccessMsg>Your order is being prepared. Thanks for choosing K-SHOP!</SuccessMsg>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
}

export default Success;
