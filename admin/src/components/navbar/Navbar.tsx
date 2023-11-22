import {
  CropFreeSharp,
  GridView,
  NotificationsOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="icons">
        <Search className="icon" />
        <GridView className="icon" />
        <CropFreeSharp className="icon" />
        <div className="notifications">
          <NotificationsOutlined className="icon" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://media.licdn.com/dms/image/C4E03AQHEHCSHtBJMQQ/profile-displayphoto-shrink_800_800/0/1661277175020?e=1705536000&v=beta&t=xCeST-m10o-habV9cJXpARmIeSj_wTNGix6Qqy8zMu4"
            alt=""
          />
          <span>Shayne</span>
        </div>
        <SettingsOutlined className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
