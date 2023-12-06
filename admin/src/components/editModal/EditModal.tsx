import "./editModal.scss";
import { HighlightOff } from "@mui/icons-material";
import { ChangeEvent, useEffect, useRef } from "react";
import { ColumnInfo } from "../../types";
import { useUpdateRowMutation } from "../../redux/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Props = {
  slug: string;
  columns: ColumnInfo[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: { [key: string]: any };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
};

const EditModal: React.FC<Props> = ({
  slug,
  columns,
  setOpen,
  formData,
  setFormData,
}) => {
  const user = useSelector(
    (state: RootState) => state.auth.currentUser.username
  );
  const ref = useRef<HTMLDivElement>(null);
  const [editItem, { isSuccess, error, reset }] = useUpdateRowMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    <div className="editContainer">
      <div className="modal" ref={ref}>
        <HighlightOff
          className="close"
          onClick={() => {
            setOpen(false);
          }}
        />
        <h1>Edit {slug}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Clicked submit");
          }}
        >
          {columns
            .filter((item) => {
              return (
                (slug === "user" && formData?.username === user) ||
                (item.field !== "password" && item.field !== "confirmPassword")
              );
            })
            .map((column) => (
              <div
                className="item"
                key={column.field}
                style={{
                  width: column.inputType === "textarea" ? "100%" : "45%",
                }}
              >
                <label htmlFor={column.field}>
                  {column.headerName === "Password"
                    ? "New Password"
                    : column.headerName}
                </label>
                {column.inputType === "textarea" ? (
                  <textarea
                    name={column.field}
                    id={column.field}
                    value={formData[column.field]}
                    onChange={handleChange}
                    placeholder={column.placeholder || column.headerName}
                  />
                ) : (
                  <input
                    type={column.inputType}
                    name={column.field}
                    id={column.field}
                    placeholder={column.placeholder || column.headerName}
                    value={
                      column.field === "password" ? "" : formData[column.field]
                    }
                    onChange={handleChange}
                    step={
                      column.field === "price" || column.field === "amount"
                        ? 0.01
                        : undefined
                    }
                    checked={
                      column.inputType === "checkbox"
                        ? formData[column.field]
                        : undefined
                    }
                  />
                )}
              </div>
            ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
