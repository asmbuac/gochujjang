import styled from "styled-components";
import Artists from "../components/Artists";
import { mobile } from "../responsive";
import { useState } from "react";

const Container = styled.div`
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  padding: 20px;
  text-transform: uppercase;
`;

const FilterContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  ${mobile({ fontSize: "16px" })}
`;

const Select = styled.select`
  padding: 10px;
  ${mobile({ fontSize: "12px" })}
`;

const Option = styled.option``;

const ArtistList = () => {
  const [filter, setFilter] = useState("");
  console.log(filter);

  return (
    <Container>
      <Title>All Artists</Title>
      <FilterContainer>
        <FilterText>Filter Artists:</FilterText>
        <Select
          name="type"
          defaultValue=""
          onChange={(e) => setFilter(e.target.value)}
        >
          <Option value="">All</Option>
          <Option value="girl-group">Girl Group</Option>
          <Option value="boy-group">Boy Group</Option>
          <Option value="co-ed-group">Co-ed Group</Option>
          <Option value="female-solo">Female Solo</Option>
          <Option value="male-solo">Male Solo</Option>
        </Select>
      </FilterContainer>
      <Artists filter={filter} />
    </Container>
  );
};

export default ArtistList;
