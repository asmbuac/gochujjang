import Badge from "@mui/material/Badge";
import {
  FavoriteBorder,
  AccountCircleOutlined,
  Search,
  ShoppingCartOutlined,
  Close,
  Menu,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile, md, lg } from "../responsive";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { deleteCart } from "../redux/cartSlice";
import {
  useCreateCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "../redux/cartApi";
import { useState } from "react";
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
  position: relative;
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

const SliderContainer = styled.div`
  ${lg({
    width: (props) => props.open && "100%",
    height: (props) => props.open && "calc(100vh + 30px)",
    position: "absolute",
    top: "-30px",
    left: "0px",
    backgroundColor: (props) =>
      props.open ? "rgb(0, 0, 0, 0.3)" : "transparent",
    transition: "all 500ms cubic-bezier(0.75, 0, 0.175, 1)",
    zIndex: (props) => props.open && "99999",
  })}
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  position: static;

  ${lg({
    flexDirection: "column",
    position: "absolute",
    width: "340px",
    maxWidth: "100%",
    height: "100vh",
    backgroundColor: "white",
    top: "0px",
    left: (props) => (props.open ? "0px" : "-400px"),
    padding: "30px",
    transition: "all 500ms cubic-bezier(0.67, 0.26, 0.18, 1)",
    overflow: "hidden",
  })}
`;

const CloseIconContainer = styled.div`
  width: 100%;
`;

const CloseIcon = styled(Close)`
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

const MenuItem = styled(NavLink)`
  text-align: center;
  font-size: 14px;
  text-decoration: none;
  color: black;
  transition: all 300ms ease;
  display: ${(props) => props.hideOnLarge && "none"};

  ${lg({
    width: (props) => props.width && "100%",
    textAlign: (props) => props.align && "left",
    display: (props) => props.hideOnLarge && "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: (props) => props.hideOnLarge && "bold",
  })}
  ${mobile({
    display: (props) => props.hide && "none",
  })}

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const Icon = styled(SvgIcon)`
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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.auth.currentUser);
  const storeCart = useSelector((state) => state.cart.products);
  const { data: cartData } = useGetCartQuery(user?._id);
  const [createCart] = useCreateCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (storeCart.length > 0) {
      const products = storeCart.map(({ _id, quantity }) => ({
        product: _id,
        quantity,
      }));

      await (cartData
        ? updateCart({ id: user?._id, data: { products } })
        : createCart({ userId: user?._id, products }));
    }
    dispatch(deleteCart());
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuIcon onClick={() => setOpen(true)} />
          <SliderContainer open={open}>
            <MenuContainer open={open}>
              {open && (
                <CloseIconContainer open={open}>
                  <CloseIcon onClick={() => setOpen(false)} />
                </CloseIconContainer>
              )}
              <MenuItem to="/products" width="100%" align="left">
                ALL
              </MenuItem>
              <MenuItem to="/products/pre-orders" width="100%" align="left">
                PRE-ORDERS
              </MenuItem>
              <MenuItem to="/products/albums" width="100%" align="left">
                ALBUMS
              </MenuItem>
              <MenuItem to="/products/light sticks" width="100%" align="left">
                LIGHT STICKS
              </MenuItem>
              <MenuItem to="/artists" width="100%" align="left">
                ALL ARTISTS
              </MenuItem>
              {open && user ? (
                <MenuItem to="/" onClick={handleLogout} hideOnLarge={true}>
                  LOGOUT
                </MenuItem>
              ) : (
                <MenuItem
                  to="/login"
                  hideOnLarge={true}
                  width="100%"
                  align="left"
                >
                  <Icon component={AccountCircleOutlined} />
                  MY ACCOUNT
                </MenuItem>
              )}
            </MenuContainer>
          </SliderContainer>
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
          {user ? (
            <MenuItem to="/" onClick={handleLogout} hide={true}>
              LOGOUT
            </MenuItem>
          ) : (
            <MenuItem to="/login" hide={true}>
              <Icon component={AccountCircleOutlined} />
            </MenuItem>
          )}
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
