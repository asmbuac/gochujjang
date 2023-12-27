import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div``;

const ArtistLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: black;
  transition: all 250ms ease-out;

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
    transform: translateY(-10px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
`;

const Name = styled.span`
  text-decoration: none;
`;

const Artist = ({ artist }) => {
  return (
    <Container>
      <ArtistLink to={`/products/${artist.name}`}>
        <Image src={artist.img} />
        <Name>{artist.name}</Name>
      </ArtistLink>
    </Container>
  );
};

export default Artist;
