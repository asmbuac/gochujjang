import styled from "styled-components";
import Product from "./Product";
import { Container } from "../ui/DetailsSection";

const Header = styled.h2`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 10px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Products = ({ products }) => {
  return (
    <Container>
      <Header>Products</Header>
      <ProductContainer>
        {!products
          ? "Loading products..."
          : products?.map((product) => (
              <Product key={product?.product?._id} productDetails={product} />
            ))}
      </ProductContainer>
    </Container>
  );
};

export default Products;
