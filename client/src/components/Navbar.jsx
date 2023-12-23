import Badge from "@mui/material/Badge";
import {
  FavoriteBorder,
  AccountCircleOutlined,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { deleteCart } from "../redux/cartSlice";
import {
  useCreateCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "../redux/cartApi";

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
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  column-gap: 25px;
  ${mobile({ flex: 1.5, justifyContent: "center", columnGap: "10px" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
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
  ${mobile({ height: "20px", width: "20px" })}
`;

const BrandName = styled.h2`
  font-family: "Audiowide";
  ${mobile({ fontSize: "14px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 25px;
  ${mobile({ flex: 1.5, justifyContent: "center", columnGap: "10px" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}
`;

const Currency = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
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

const CartBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: #7487bf;
    color: white;
  }
`;

const Navbar = () => {
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
          <MenuItem to="/products">ALL</MenuItem>
          <MenuItem to="/products/pre-orders">PRE-ORDERS</MenuItem>
          <MenuItem to="/products/albums">ALBUMS</MenuItem>
          <MenuItem to="/products/light sticks">LIGHT STICKS</MenuItem>
          <MenuItem to="/artists">ALL ARTISTS</MenuItem>
        </Left>
        <Center>
          <NavbarLink to="/" display="flex">
            <Logo src="/src/assets/logo.png" />
            <BrandName>Jjang</BrandName>
          </NavbarLink>
        </Center>
        <Right>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
            />
          </SearchContainer>
          <Currency>USD</Currency>
          {user ? (
            <MenuItem to="/" onClick={handleLogout}>
              LOGOUT
            </MenuItem>
          ) : (
            <MenuItem to="/login">
              <AccountCircleOutlined />
            </MenuItem>
          )}
          <MenuItem to="/wishlist">
            <FavoriteBorder />
          </MenuItem>
          <MenuItem to="/cart">
            <CartBadge badgeContent={quantity}>
              <ShoppingCartOutlined />
            </CartBadge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
