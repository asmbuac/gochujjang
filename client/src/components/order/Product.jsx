import styled from "styled-components";
import { useGetArtistQuery } from "../../redux/artistApi";

const Row = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const ImageAndTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Artist = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: gray;
  letter-spacing: 1px;
`;

const ProductName = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const ItemNum = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

const PriceAndQuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
`;

const Quantity = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

const Product = ({ productDetails }) => {
  const { product, quantity } = productDetails;
  const { data: artist } = useGetArtistQuery(product?.artist);

  return (
    <Row>
      <ImageAndTextContainer>
        <ImageContainer>
          <Image src={product?.image} />
        </ImageContainer>
        <TextContainer>
          <Artist>{artist?.name}</Artist>
          <ProductName>{product?.title}</ProductName>
          <ItemNum>Item No. {product?._id}</ItemNum>
        </TextContainer>
      </ImageAndTextContainer>
      <PriceAndQuantityContainer>
        <Price>${product?.price}</Price>
        <Quantity>QTY: {quantity}</Quantity>
      </PriceAndQuantityContainer>
    </Row>
  );
};

export default Product;
