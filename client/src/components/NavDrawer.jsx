import { AccountCircleOutlined, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import {
  useCreateCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "../redux/cartApi";
import { deleteCart } from "../redux/cartSlice";
import { logout } from "../redux/authSlice";
import useCheckOutsideClick from "../hooks/useCheckOutsideClick";
import useHideScrollbar from "../hooks/useHideScrollbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: ${(props) =>
    props.open ? "rgb(0, 0, 0, 0.3)" : "transparent"};
  visibility: ${(props) => !props.open && "hidden"};
  z-index: 99999;
  transition: all 600ms ease-in-out;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0px;
  left: ${(props) => (props.open ? "0px" : "-400px")};
  background-color: white;
  width: 80vw;
  max-width: 400px;
  height: 100%;
  transition: all 600ms cubic-bezier(0.75, 0, 0.175, 1);
`;

const MenuContainer = styled.div`
  width: calc(100% - 60px);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  gap: 25px;
`;

const CloseIconContainer = styled.div`
  width: 100%;
`;

const CloseIcon = styled(Close)`
  cursor: pointer;

  ${mobile({
    height: "20px !important",
    width: "20px !important",
  })}
`;

const MenuItem = styled(NavLink)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
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

const AccountContainer = styled.div`
  width: calc(100% - 60px);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  gap: 25px;
`;

const AccountIcon = styled(AccountCircleOutlined)`
  ${mobile({
    height: "20px !important",
    width: "20px !important",
  })}
`;

const NavDrawer = ({ open, setOpen }) => {
  const ref = useCheckOutsideClick(setOpen);
  const user = useSelector((state) => state.auth.currentUser);
  const storeCart = useSelector((state) => state.cart.products);
  const { data: cartData } = useGetCartQuery(user?._id);
  const [createCart] = useCreateCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const dispatch = useDispatch();
  useHideScrollbar(open);

  const handleLogout = async () => {
    let products;
    if (storeCart.length > 0) {
      products = storeCart.map(({ _id, quantity }) => ({
        product: _id,
        quantity,
      }));
    } else {
      products = [];
    }
    await (cartData
      ? updateCart({ id: user?._id, data: { products } })
      : createCart({ userId: user?._id, products }));
    dispatch(deleteCart());
    dispatch(logout());
    setOpen(false);
  };

  return (
    <Container open={open}>
      <Wrapper open={open} ref={ref}>
        <MenuContainer>
          <CloseIconContainer>
            <CloseIcon onClick={() => setOpen(false)} />
          </CloseIconContainer>
          <MenuItem to="/products" onClick={() => setOpen(false)}>
            ALL
          </MenuItem>
          <MenuItem to="/products/pre-orders" onClick={() => setOpen(false)}>
            PRE-ORDERS
          </MenuItem>
          <MenuItem to="/products/albums" onClick={() => setOpen(false)}>
            ALBUMS
          </MenuItem>
          <MenuItem to="/products/light sticks" onClick={() => setOpen(false)}>
            LIGHT STICKS
          </MenuItem>
          <MenuItem to="/artists" onClick={() => setOpen(false)}>
            ALL ARTISTS
          </MenuItem>
        </MenuContainer>
        <AccountContainer>
          <MenuItem
            to={user ? "/account" : "/login"}
            onClick={() => setOpen(false)}
          >
            <AccountIcon />
            ACCOUNT
          </MenuItem>
          {user && (
            <MenuItem to="/" onClick={handleLogout}>
              LOGOUT
            </MenuItem>
          )}
        </AccountContainer>
      </Wrapper>
    </Container>
  );
};

export default NavDrawer;
