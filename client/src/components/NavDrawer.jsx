import { AccountCircleOutlined, Close } from "@mui/icons-material";
import { useEffect, useRef } from "react";
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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: ${(props) =>
    props.open ? "rgb(0, 0, 0, 0.3)" : "transparent"};
  transition: all 500ms cubic-bezier(0.75, 0, 0.175, 1);
  z-index: ${(props) => (props.open ? "99999" : "-99999")};
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
  width: 340px;
  max-width: 100%;
  height: calc(100vh - 60px);
  padding: 30px;
  transition: all 500ms cubic-bezier(0.67, 0.26, 0.18, 1);
`;

const MenuContainer = styled.div`
  width: 100%;
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
  width: 100%;
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
  const ref = useRef();
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
    setOpen(false);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside, true);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

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
