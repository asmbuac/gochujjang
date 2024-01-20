import { useEffect, useState } from "react";
import "./menuItem.scss";
import { SvgIconComponent } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Tooltip from "../tooltip/Tooltip";

type Props = {
  listItem: {
    id?: number;
    title: string;
    url?: string;
    icon: SvgIconComponent;
  };
  userId?: string;
};

const MenuItem: React.FC<Props> = ({ listItem, userId }) => {
  const [tooltipOption, setTooltipOption] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    const checkWindowWidth = () => {
      window.innerWidth < 1024
        ? setTooltipOption(true)
        : setTooltipOption(false);
    };

    checkWindowWidth();

    window.addEventListener("resize", checkWindowWidth, true);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, [setTooltipOption]);

  return (
    <div className="menuItem">
      <Link
        to={listItem.url || `/users/${userId}`}
        className="listItem"
        key={listItem.id}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <listItem.icon />
        <span className="listItemTitle">{listItem.title}</span>
      </Link>
      {tooltipOption && showTooltip && <Tooltip content={listItem.title} />}
    </div>
  );
};

export default MenuItem;
