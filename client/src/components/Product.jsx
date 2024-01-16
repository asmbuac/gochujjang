import {
  Favorite,
  FavoriteBorderOutlined,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { useContext, useRef } from "react";
import { WishlistContext } from "../App";
import { useUpdateWishlistMutation } from "../redux/wishlistApi";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 400ms ease;
`;

const Container = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  z-index: 1;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 400ms ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Product = ({ item }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useContext(WishlistContext);
  const userId = useSelector((state) => state.auth.currentUser?._id);
  const [updateWishlist] = useUpdateWishlistMutation();

  const addToCart = () => {
    dispatch(addProduct({ ...item, quantity: 1, color: "", size: "" }));
  };

  const addToWishlist = () => {
    updateWishlist({
      userId,
      data: {
        products: [...wishlist, item._id],
      },
    });
  };

  const removeFromWishlist = () => {
    wishlist.delete(item._id);
    updateWishlist({
      userId,
      data: {
        products: [...wishlist],
      },
    });
  };

  const checkIfClickedOutside = (e) => {
    if (ref.current && e.target.contains(ref.current)) {
      navigate(`/product/${item._id}`);
    }
  };

  return (
    <Container>
      <Image src={item.image} />
      <Info ref={ref} onClick={checkIfClickedOutside}>
        <Icon>
          <ShoppingCartOutlined onClick={addToCart} />
        </Icon>
        <Icon>
          <ProductLink to={`/product/${item._id}`}>
            <Search />
          </ProductLink>
        </Icon>
        <Icon>
          {wishlist && wishlist.has(item._id) ? (
            <Favorite onClick={removeFromWishlist} />
          ) : (
            <FavoriteBorderOutlined onClick={addToWishlist} />
          )}
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
