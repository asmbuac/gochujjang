import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-transform: uppercase;
`;

const ProductContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Wishlist = () => {
  return (
    <Container>
      <Title>My Wishlist</Title>
      <ProductContainer></ProductContainer>
    </Container>
  );
};

export default Wishlist;
