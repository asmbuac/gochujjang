import Badge from "@mui/material/Badge";
import {
  FavoriteBorder,
  AccountCircleOutlined,
  Search,
  ShoppingCartOutlined,
  Menu,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile, md, lg } from "../responsive";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { SvgIcon } from "@mui/material";

const Container = styled.div`
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  ${mobile({ height: "50px" })}
  }
`;

const Wrapper = styled.div`
  height: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "0px 10px" })}
`;

const Left = styled.div`
  flex: 3;
`;

const MenuIcon = styled(Menu)`
  display: none !important;

  ${lg({
    display: "block !important",
    cursor: "pointer",
  })}
  ${mobile({
    height: "20px !important",
    width: "20px !important",
  })}
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 25px;

  ${lg({ display: "none" })}
`;

const MenuItem = styled(NavLink)`
  text-align: center;
  font-size: 14px;
  text-decoration: none;
  color: black;
  transition: all 300ms ease;
  ${mobile({ fontSize: "12px" })}

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavbarLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  display: ${(props) => props.display && "flex"};
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Logo = styled.img`
  height: 30px;
  width: 30px;
  ${mobile({ height: "24px", width: "24px" })}
`;

const BrandName = styled.h2`
  font-family: "Audiowide";
  ${mobile({ fontSize: "20px" })}
`;

const Right = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 25px;

  ${md({ columnGap: "15px" })}
`;

const Currency = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${md({ display: "none" })}
`;

const Icon = styled(SvgIcon)`
  cursor: pointer;

  ${mobile({
    height: "20px !important",
    width: "20px !important",
  })}
`;

const CartBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: #7487bf;
    color: white;
  }
`;

const Navbar = ({ setOpen }) => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuIcon onClick={() => setOpen(true)} />
          <MenuContainer>
            <MenuItem to="/products">ALL</MenuItem>
            <MenuItem to="/products/pre-orders">PRE-ORDERS</MenuItem>
            <MenuItem to="/products/albums">ALBUMS</MenuItem>
            <MenuItem to="/products/light sticks">LIGHT STICKS</MenuItem>
            <MenuItem to="/artists">ALL ARTISTS</MenuItem>
          </MenuContainer>
        </Left>
        <Center>
          <NavbarLink to="/" display="flex">
            <Logo src="/src/assets/logo.png" />
            <BrandName>Jjang</BrandName>
          </NavbarLink>
        </Center>
        <Right>
          <Currency>USD</Currency>
          <Icon component={Search} />
          <MenuItem to={user ? "/account" : "/login"} hide={true}>
            <Icon component={AccountCircleOutlined} />
          </MenuItem>
          <MenuItem to="/wishlist">
            <Icon component={FavoriteBorder} />
          </MenuItem>
          <MenuItem to="/cart">
            <CartBadge badgeContent={quantity}>
              <Icon component={ShoppingCartOutlined} />
            </CartBadge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
