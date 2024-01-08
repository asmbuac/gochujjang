import { Close, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgb(0, 0, 0, 0.3);
  z-index: 99999;
`;

const Wrapper = styled.div`
  width: 90vw;
  max-width: 500px;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  width: calc(100% - 60px);
  padding: 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d5dbeb;
  gap: 10px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchIcon = styled(Search)``;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 18px;
`;

const CloseIcon = styled(Close)``;

const ProductsContainer = styled.div`
  width: calc(100% - 60px);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Overlay = styled(Link)`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 200ms ease;
`;

const Product = styled.div`
  position: relative;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const Info = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const Artist = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: gray;
  letter-spacing: 1px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #7487bf;
  letter-spacing: 1px;
`;

const ButtonContainer = styled.div`
  width: calc(100% - 60px);
  padding: 0px 30px 30px 30px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #7487bf;
  border: none;
  color: white;
  letter-spacing: 2px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    background-color: #5c6c98;
  }
`;

const SearchDrawer = () => {
  return (
    <Container>
      <Wrapper>
        <SearchContainer>
          <InputContainer>
            <SearchIcon />
            <SearchInput />
          </InputContainer>
          <CloseIcon />
        </SearchContainer>
        <ProductsContainer>
          <Product>
            <Info to="/products">
              <Image src="https://kpopmerch.com/cdn/shop/files/blackpink-md-goods-blackpink-blackpink-the-game-coupon-card-35485463412917_1000x.jpg?v=1686551535" />
              <Details>
                <Artist>BLACKPINK</Artist>
                <Title>BLACKPINK - BLACKPINK The Game Coupon Card</Title>
                <Price>$11.70</Price>
              </Details>
            </Info>
            <Overlay to="/products"></Overlay>
          </Product>
          <Product>
            <Info to="/products">
              <Image src="https://kpopmerch.com/cdn/shop/files/blackpink-md-goods-blackpink-blackpink-the-game-coupon-card-35485463412917_1000x.jpg?v=1686551535" />
              <Details>
                <Artist>BLACKPINK</Artist>
                <Title>BLACKPINK - BLACKPINK The Game Coupon Card</Title>
                <Price>$11.70</Price>
              </Details>
            </Info>
            <Overlay to="/products"></Overlay>
          </Product>
        </ProductsContainer>
        <ButtonContainer>
          <Button>View All Results</Button>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default SearchDrawer;
