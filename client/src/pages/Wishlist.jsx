import styled from "styled-components";
import { md, lg, xl } from "../responsive";
import { useGetWishlistQuery } from "../redux/wishlistApi";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  margin: 20px;
  text-transform: uppercase;
`;

const ProductContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;
  ${xl({ gridTemplateColumns: "repeat(4, 1fr)" })}
  ${lg({ gridTemplateColumns: "repeat(3, 1fr)" })}
  ${md({ gridTemplateColumns: "repeat(2, 1fr)" })}
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: black;
  transition: all 300ms ease;

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const Wishlist = () => {
  const userId = useSelector((state) => state.auth.currentUser?._id);
  const { data, isLoading } = useGetWishlistQuery(userId);

  return (
    <Container>
      <Title>My Wishlist</Title>
      <ProductContainer>
        {!userId ? (
          <LoginLink to="/login">Sign in to use this feature</LoginLink>
        ) : isLoading ? (
          "Loading..."
        ) : !data?.products.length ? (
          "Your wishlist is empty"
        ) : (
          data?.products.map((product) => (
            <Product item={product} key={product._id} />
          ))
        )}
      </ProductContainer>
    </Container>
  );
};

export default Wishlist;
