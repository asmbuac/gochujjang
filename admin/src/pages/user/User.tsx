import { useLocation } from "react-router-dom";
import Single from "../../components/single/Single";
import { singleUser } from "../../data";
import "./user.scss";
import { useGetRowQuery } from "../../redux/apiSlice";

const User = () => {
  const id = useLocation().pathname.split("/").pop();
  const { data, isLoading } = useGetRowQuery({ slug: "users", id });

  return (
    <div className="user">
      {isLoading ? (
        "Loading..."
      ) : (
        <Single {...singleUser} data={data} slug="user" />
      )}
    </div>
  );
};

export default User;
