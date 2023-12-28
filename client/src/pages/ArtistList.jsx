import styled from "styled-components";
import Artists from "../components/Artists";
import { mobile, md } from "../responsive";
import { useState } from "react";
import { Search } from "@mui/icons-material";

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
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SearchContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid black;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  ${mobile({ fontSize: "12px" })}
`;

const SearchIcon = styled(Search)`
  height: 20px !important;
  width: 20px !important;
  color: gray;
  cursor: pointer;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  ${md({ display: "none" })}
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 0px;
  ${mobile({ fontSize: "12px" })}
`;

const Option = styled.option``;

const ArtistList = () => {
  const [filters, setFilters] = useState({});
  const handleFilters = (e) => {
    let { name, value, selectedOptions } = e.target;
    if (name === "type") {
      value = Array.from(selectedOptions, (option) => option.value);
    }
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <Container>
      <Title>All Artists</Title>
      <FilterContainer>
        <SearchContainer>
          <Input
            placeholder="Search Artist"
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilters}
          />
          <SearchIcon />
        </SearchContainer>
        <Filter>
          <FilterText>Filter Artists:</FilterText>
          <Select name="type" defaultValue="" onChange={handleFilters}>
            <Option value="">All</Option>
            <Option value="girl-group">Girl Group</Option>
            <Option value="boy-group">Boy Group</Option>
            <Option value="co-ed-group">Co-ed Group</Option>
            <Option value="female-solo">Female Solo</Option>
            <Option value="male-solo">Male Solo</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Artists filters={filters} />
    </Container>
  );
};

export default ArtistList;
