import {
  CropFreeSharp,
  GridView,
  NotificationsOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth.currentUser);

  return (
    <div className="navbar">
      <div className="icons">
        <Search className="icon" />
        <GridView className="icon" />
        <CropFreeSharp className="icon" />
        <div className="notifications">
          <NotificationsOutlined />
          <span>1</span>
        </div>
        <Link to={`/users/${user._id}`}>
          <div className="user">
            <img src={user.avatar || "/src/assets/noavatar.png"} alt="" />
            <span>{user.firstName}</span>
          </div>
        </Link>
        <SettingsOutlined className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
