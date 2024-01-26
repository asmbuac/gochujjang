import "./editModal.scss";
import { ErrorOutline, HighlightOff } from "@mui/icons-material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ColumnInfo } from "../../types";
import { useUpdateRowMutation } from "../../redux/apiSlice";
import { parseProducts, splitString } from "../addModal/AddModal";
import useCloseOnEscape from "../../hooks/useCloseOnEscape";

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
  const ref = useRef<HTMLDivElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [editItem, { isSuccess, error, reset }] = useUpdateRowMutation();
  useCloseOnEscape(setOpen);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (slug === "product") {
      splitString(formData, "color");
      splitString(formData, "categories");
      splitString(formData, "size");
    } else if (slug === "order") {
      splitString(formData, "products");
      parseProducts(formData);
    }

    editItem({
      data: formData,
      slug: `${slug}s`,
      id: formData._id,
    });
  };

  useEffect(() => {
    if (error) {
      const errMsg =
        error.data instanceof Object ? JSON.stringify(error.data) : error.data;
      setErrorMsg(errMsg);
    } else if (isSuccess) {
      setErrorMsg("");
      reset();
      setOpen(false);
    }
  }, [error, isSuccess, reset]);

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
        {errorMsg.length > 0 && (
          <div className="error">
            <ErrorOutline />
            <span>{errorMsg}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {columns
            .filter(
              (item) =>
                item.hasOwnProperty("required") && item.inputType !== "password"
            )
            .map((column) => (
              <div
                className="item"
                key={column.field}
                style={{
                  width: column.inputType === "textarea" ? "100%" : "45%",
                }}
              >
                <label htmlFor={column.field}>{column.headerName}</label>
                {column.inputType === "textarea" ? (
                  <textarea
                    name={column.field}
                    id={column.field}
                    value={formData[column.field]}
                    onChange={handleChange}
                    placeholder={column.placeholder || column.headerName}
                  />
                ) : column.inputType === "select" && slug === "order" ? (
                  <div className="select">
                    <select
                      name={column.field}
                      onChange={handleChange}
                      defaultValue={formData[column.field]}
                    >
                      <option value="pending">pending</option>
                      <option value="en route">en route</option>
                      <option value="complete">complete</option>
                    </select>
                  </div>
                ) : column.inputType === "select" && slug === "artist" ? (
                  <div className="select">
                    <select
                      name={column.field}
                      onChange={handleChange}
                      defaultValue={formData[column.field]}
                    >
                      <option value="girl-group">Girl Group</option>
                      <option value="boy-group">Boy Group</option>
                      <option value="co-ed-group">Co-Ed Group</option>
                      <option value="female-solo">Female Solo</option>
                      <option value="male-solo">Male Solo</option>
                    </select>
                  </div>
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
                    min={column.inputType === "number" ? 0.01 : undefined}
                    max={column.inputType === "number" ? 99999.99 : undefined}
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
