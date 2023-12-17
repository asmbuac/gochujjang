import styled from "styled-components";
import { useGetWishlistQuery } from "../redux/wishlistApi";
import { useSelector } from "react-redux";
import Product from "../components/Product";

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
  const userId = useSelector((state) => state.auth.currentUser?._id);
  const { data, isLoading } = useGetWishlistQuery(userId);

  return (
    <Container>
      <Title>My Wishlist</Title>
      <ProductContainer>
        {isLoading
          ? "Loading..."
          : !data.products.length
          ? "Your wishlist is empty"
          : data.products.map((product) => (
              <Product item={product} key={product._id} />
            ))}
      </ProductContainer>
    </Container>
  );
};

export default Wishlist;
