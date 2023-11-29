import "./add.scss";
import { HighlightOff } from "@mui/icons-material";
import { ChangeEvent, useEffect, useRef } from "react";
import { ColumnInfo, Product } from "../../types";
import { useCreateRowMutation } from "../../redux/apiSlice";

type Props = {
  slug: string;
  columns: ColumnInfo[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: Product;
  setFormData: React.Dispatch<React.SetStateAction<Product>>;
};

export const splitString = (data: any, property: string) => {
  if (data.hasOwnProperty(property) && typeof data[property] === "string") {
    data[property] = data[property]?.split(", ");
  }
};

const AddModal: React.FC<Props> = ({
  slug,
  columns,
  setOpen,
  setFormData,
  formData,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [createItem] = useCreateRowMutation();

  const resetForm = () => {
    const newForm = Object.fromEntries(
      columns
        .filter((item) => item.hasOwnProperty("inputType") && item.required)
        .map((column) => [
          column.field,
          column.type === "string"
            ? ""
            : column.type === "number"
            ? 0
            : column.type === "boolean"
            ? false
            : null,
        ])
    );
    setFormData(newForm);
  };

  const closeModal = () => {
    resetForm();
    setOpen(false);
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    splitString(formData, "color");
    splitString(formData, "categories");
    splitString(formData, "size");

    createItem({ data: formData, slug: `${slug}s` });
    resetForm();
    setOpen(false);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeModal();
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
        <HighlightOff onClick={closeModal} />
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter(
              (item) => item.field !== "_id" && item.field !== "createdAt"
            )
            .map((column) => (
              <div className="item" key={column.field}>
                <label htmlFor={column.field}>{column.headerName}</label>
                {column.field === "description" ? (
                  <textarea
                    name={column.field}
                    onChange={handleChange}
                    required={column.required}
                  />
                ) : (
                  <input
                    type={column.inputType}
                    name={column.field}
                    placeholder={column.headerName}
                    onChange={handleChange}
                    required={column.required}
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

export default AddModal;
