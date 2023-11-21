import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { HighlightOff } from "@mui/icons-material";
import { useEffect, useRef } from "react";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddModal: React.FC<Props> = ({ slug, columns, setOpen }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add new item
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside, true);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [setOpen]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="addContainer">
      <div className="modal" ref={ref}>
        <HighlightOff onClick={() => setOpen(false)} />
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter(
              (item) =>
                item.field !== "id" &&
                item.field !== "img" &&
                item.field !== "createdAt"
            )
            .map((column) => (
              <div className="item">
                <label htmlFor={column.field}>{column.headerName}</label>
                <input type={column.type} placeholder={column.headerName} />
              </div>
            ))}
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
