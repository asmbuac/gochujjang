import {
  CropFreeSharp,
  GridView,
  NotificationsOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import "./navbar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser);

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
        <div className="user">
          <img src={user.avatar || "/src/assets/noavatar.png"} alt="" />
          <span>{user.firstName}</span>
        </div>
        <SettingsOutlined className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
