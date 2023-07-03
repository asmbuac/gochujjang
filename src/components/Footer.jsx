import { Facebook, Instagram, Twitter, LinkedIn, Place, Phone, Email } from '@mui/icons-material';
import styled from 'styled-components';
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px 0px;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
font-family: "Audiowide";
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  transition: all 400ms ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#f5fafd" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>K-SHOP</Logo>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum ut facere esse dolores ullam culpa, ab inventore itaque, tenetur ducimus consectetur eligendi? Aperiam vero sapiente molestiae ipsum beatae consequuntur similique.
        </Description>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="00ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="0072B1">
            <LinkedIn />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Shop by Group/Artist</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Shipping & Delivery</ListItem>
          <ListItem>Returns & Exchanges</ListItem>
          <ListItem>Order Cancellation</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Place style={{ marginRight: "10px" }} />
          565 Sarang Ave, Saranghae, CA 96566
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +1 (234) 567-8910
        </ContactItem>
        <a href="mailto:contact@kshop.com" style={{ textDecoration: "none", color: "black" }}>
          <ContactItem>
            <Email style={{ marginRight: "10px" }} />
            contact@kshop.com
          </ContactItem>
        </a>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
