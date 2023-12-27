import styled from "styled-components";
import Artists from "../components/Artists";

const Container = styled.div``;

const Wrapper = styled.div`
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const ArtistList = () => {
  return (
    <Container>
      <Wrapper>
        <Title>All Artists</Title>
        <Artists />
      </Wrapper>
    </Container>
  );
};

export default ArtistList;
