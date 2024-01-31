import styled from "styled-components";
import Product from "./Product";

const Header = styled.h2`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Products = ({ products }) => {
  return (
    <>
      <Header>Products</Header>
      <Container>
        {!products
          ? "Loading products..."
          : products?.map((product) => (
              <Product key={product?.product?._id} productDetails={product} />
            ))}
      </Container>
    </>
  );
};

export default Products;
