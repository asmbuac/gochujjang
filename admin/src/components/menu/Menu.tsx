import "./menu.scss";
import { menu } from "../../data";
import { Logout } from "@mui/icons-material";
import { logout } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import MenuItem from "../menuItem.tsx/MenuItem";

const Menu = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.currentUser._id);

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
              <MenuItem listItem={listItem} userId={userId} />
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
