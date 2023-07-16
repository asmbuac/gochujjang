import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../redux/cartSlice";

const Product = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-transform: uppercase;
  ${mobile({ fontSize: "14px" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid lightgray;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AmountAndRemoveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 50px;
  gap: 5px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.input`
  font-size: 24px;
  margin: 5px;
  width: 50px;
  text-align: end;
  border: none;
  border-bottom: 2px solid black;
  padding: 10px 0px;
  outline: none;
  ${mobile({ margin: "10px 15px", textAlign: "center" })}
`;

const RemoveProduct = styled.span`
  font-size: 14px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    color: #7487bf;
  }
`;

const ProductPrice = styled.span`
  font-size: 24px;
  font-weight: 200;
`;

const CartItem = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const dispatch = useDispatch();

  const handleQuantity = (type, product) => {
    if (type === "dec") {
      setQuantity(Number(quantity) - 1);
      dispatch(removeProduct({ ...product, quantity: 1 }));
    } else if (type === "inc") {
      setQuantity(Number(quantity) + 1);
      dispatch(addProduct({ ...product, quantity: 1 }));
    } else if (type === "del") {
      dispatch(removeProduct({ ...product, quantity: product.quantity }));
    } else {
      setQuantity(type);
      if (type) {
        const diff = Number(type) - product.quantity;
        diff > 0
          ? dispatch(addProduct({ ...product, quantity: diff }))
          : dispatch(removeProduct({ ...product, quantity: Math.abs(diff) }));
      }
    }
  };

  return (
    <Product key={product._id}>
      <ProductDetails>
        <Image src={product.image} />
        <Details>
          <ProductName>
            <b>Product: </b>
            {product.title}
          </ProductName>
          <ProductId>
            <b>ID: </b>
            {product._id}
          </ProductId>
          {product.color && <ProductColor color={product.color} />}
          {product.size && (
            <ProductSize>
              <b>Size: </b>
              {product.size}
            </ProductSize>
          )}
        </Details>
      </ProductDetails>
      <PriceDetails>
        <AmountAndRemoveContainer>
          <ProductAmountContainer>
            <Remove
              onClick={() => handleQuantity("dec", product)}
              style={{ cursor: "pointer" }}
            />
            <ProductAmount
              type="number"
              value={quantity}
              min="0"
              onChange={(e) => handleQuantity(e.target.value, product)}
            />
            <Add
              onClick={() => handleQuantity("inc", product)}
              style={{ cursor: "pointer" }}
            />
          </ProductAmountContainer>
          <RemoveProduct onClick={() => handleQuantity("del", product)}>
            Remove
          </RemoveProduct>
        </AmountAndRemoveContainer>
        <ProductPrice>
          ${(product.price * product.quantity).toFixed(2)}
        </ProductPrice>
      </PriceDetails>
    </Product>
  );
};

export default CartItem;
