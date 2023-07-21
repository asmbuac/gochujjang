import styled from "styled-components";
import Product from "./Product";
import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../redux/productApi";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ category, filters, sort }) => {
  const { data: products } = useGetProductsQuery(category);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products?.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      if (sort === "newest") {
        setFilteredProducts((prev) =>
          [...prev]?.sort((a, b) => a.createdAt - b.createdAt)
        );
      } else if (sort === "asc") {
        setFilteredProducts((prev) =>
          [...prev]?.sort((a, b) => a.price - b.price)
        );
      } else {
        setFilteredProducts((prev) =>
          [...prev]?.sort((a, b) => b.price - a.price)
        );
      }
    }
  }, [sort]);

  return (
    <Container>
      {category
        ? filteredProducts?.map((item) => (
            <Product item={item} key={item._id} />
          ))
        : products
            ?.slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
