import styled from "styled-components";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0px;
`;

const Title = styled.h1`
  padding: 20px;
  text-transform: uppercase;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  ${mobile({ flexDirection: "column", gap: "10px" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  ${mobile({ fontSize: "16px" })}
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 0px;
  ${mobile({ fontSize: "12px", width: "100%" })}
`;

const Option = styled.option``;

const ProductList = () => {
  const params = useParams();
  const category = params?.category || "";
  const [searchParams, setSearchParams] = useSearchParams();
  const artist = searchParams.get("artist") || "";
  const title = searchParams.get("title") || "";
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Title>{category ? category : "All Products"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" defaultValue="default" onChange={handleFilters}>
            <Option disabled value="default">
              Color
            </Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
            <Option value="purple">Purple</Option>
            <Option value="pink">Pink</Option>
          </Select>
          <Select name="size" defaultValue="default" onChange={handleFilters}>
            <Option disabled value="default">
              Size
            </Option>
            <Option value="xs">XS</Option>
            <Option value="s">S</Option>
            <Option value="m">M</Option>
            <Option value="l">L</Option>
            <Option value="xl">XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select
            defaultValue="newest"
            onChange={(e) => setSort(e.target.value)}
          >
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products
        category={category}
        params={{ category, artist, title }}
        filters={filters}
        sort={sort}
      />
    </Container>
  );
};

export default ProductList;
