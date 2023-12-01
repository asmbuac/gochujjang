import "./add.scss";
import { HighlightOff } from "@mui/icons-material";
import { ChangeEvent, useEffect, useRef } from "react";
import { ColumnInfo, Order, Product } from "../../types";
import { useCreateRowMutation } from "../../redux/apiSlice";
import { useLocation } from "react-router-dom";

type Props = {
  slug: string;
  columns: ColumnInfo[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: Product & Order;
  setFormData: React.Dispatch<React.SetStateAction<Product | Order>>;
};

export const splitString = (data: any, property: string) => {
  if (data.hasOwnProperty(property) && typeof data[property] === "string") {
    data[property] = data[property]
      ?.split(",")
      .map((item: string) => item.trim());
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
  const pathName = useLocation().pathname;
  const [createItem] = useCreateRowMutation();

  const resetForm = () => {
    const newForm = Object.fromEntries(
      columns
        .filter(
          (item) =>
            item.hasOwnProperty("inputType") &&
            (item.required || item.type === "boolean")
        )
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
    if (pathName === "/products") {
      splitString(formData, "color");
      splitString(formData, "categories");
      splitString(formData, "size");
    } else if (pathName === "/orders") {
      splitString(formData, "products");

      if (formData.products instanceof Array) {
        formData.products = formData.products.map((product) => {
          const splitProduct = (product as string).split(" ");
          return { product: splitProduct[0], quantity: splitProduct[1] };
        });
      }
    }

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
            .filter((item) => item.hasOwnProperty("required"))
            .map((column) => (
              <div className="item" key={column.field}>
                <label htmlFor={column.field}>{column.headerName}</label>
                {column.inputType === "textarea" ? (
                  <textarea
                    name={column.field}
                    id={column.field}
                    onChange={handleChange}
                    required={column.required}
                    placeholder={column.placeholder || column.headerName}
                  />
                ) : (
                  <input
                    type={column.inputType}
                    name={column.field}
                    id={column.field}
                    placeholder={column.placeholder || column.headerName}
                    onChange={handleChange}
                    required={column.required}
                    step={
                      column.field === "price" || column.field === "amount"
                        ? 0.01
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

export default AddModal;
