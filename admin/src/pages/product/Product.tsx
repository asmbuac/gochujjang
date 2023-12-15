import { useLocation } from "react-router-dom";
import Single from "../../components/single/Single";
import { singleProduct } from "../../data";
import "./product.scss";
import { useGetRowQuery } from "../../redux/apiSlice";

const Product = () => {
  const id = useLocation().pathname.split("/").pop();
  const { data, isLoading } = useGetRowQuery({ slug: "products", id });

  return (
    <div className="product">
      {isLoading ? (
        "Loading"
      ) : (
        <Single {...singleProduct} data={data} slug="product" />
      )}
    </div>
  );
};

export default Product;
