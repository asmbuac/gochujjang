import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data";
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Menu = () => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="menu">
      <div className="top">
        <div className="brand">
          <img src="/src/assets/logo.png" alt="" />
          <span>Jjang</span>
        </div>
        {menu.map((item) => (
          <div className="item" key={item.id}>
            <span className="title">{item.title}</span>
            {item.listItems.map((listItem) => (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <listItem.icon />
                <span className="listItemTitle">{listItem.title}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="logout" onClick={handleClick}>
        <Logout />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Menu;
