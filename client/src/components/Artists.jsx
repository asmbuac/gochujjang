import styled from "styled-components";
import { md, lg, xl } from "../responsive";
import { useGetArtistsQuery } from "../redux/artistApi";
import Artist from "./Artist";

const Container = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;
  ${xl({ gridTemplateColumns: "repeat(4, 1fr)" })}
  ${lg({ gridTemplateColumns: "repeat(3, 1fr)" })}
  ${md({ gridTemplateColumns: "repeat(2, 1fr)" })}
`;

const Artists = () => {
  const { data: artists } = useGetArtistsQuery();

  return (
    <Container>
      {artists?.map((artist) => (
        <Artist artist={artist} key={artist._id} />
      ))}
    </Container>
  );
};

export default Artists;
