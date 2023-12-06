import {
  FavoriteBorderOutlined,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { useRef } from "react";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 400ms ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }

  ${mobile({ minWidth: "40vw", height: "20vh" })}
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #f5fbfd;
  position: absolute;

  ${mobile({ width: "150px", height: "150px" })}
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;

  ${mobile({ height: "65%" })}
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

  const addToCart = () => {
    dispatch(addProduct({ ...item, quantity: 1, color: "", size: "" }));
  };

  const checkIfClickedOutside = (e) => {
    if (ref.current && e.target.contains(ref.current)) {
      navigate(`/product/${item._id}`);
    }
  };

  return (
    <Container>
      <Circle />
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
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
