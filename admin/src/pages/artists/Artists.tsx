import "./artists.scss";
import { Add } from "@mui/icons-material";
import { useState } from "react";

const Artists = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="artists">
      <div className="info">
        <h1>Artists</h1>
        <button onClick={() => setOpen(true)}>
          <Add />
          <span>Add New Artist</span>
        </button>
      </div>
    </div>
  );
};

export default Artists;
