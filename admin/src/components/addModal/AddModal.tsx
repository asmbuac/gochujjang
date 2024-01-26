import "./addModal.scss";
import { ErrorOutline, HighlightOff } from "@mui/icons-material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ColumnInfo, Order, Product, User } from "../../types";
import { useCreateRowMutation } from "../../redux/apiSlice";
import useCloseOnEscape from "../../hooks/useCloseOnEscape";

type Props = {
  slug: string;
  columns: ColumnInfo[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: Product & Order & User;
  setFormData: React.Dispatch<React.SetStateAction<Product | Order | User>>;
};

export const splitString = (data: any, property: string) => {
  if (data.hasOwnProperty(property) && typeof data[property] === "string") {
    data[property] = data[property]
      ?.split(",")
      .map((item: string) => item.trim());
  }
};

export const parseProducts = (formData: Product & Order & User) => {
  if (formData.products instanceof Array) {
    formData.products = formData.products.map((product) => {
      const splitProduct = (product as string).split(" ");
      return { product: splitProduct[0], quantity: splitProduct[1] };
    });
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
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [createItem, { isSuccess, error, reset }] = useCreateRowMutation();
  useCloseOnEscape(setOpen);

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
    } else {
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg("Passwords do not match");
        return;
      } else {
        setErrorMsg("");
      }
    }

    createItem({
      data: formData,
      slug: slug === "user" ? "auth/register" : `${slug}s`,
    });
  };

  useEffect(() => {
    if (error) {
      const errMsg =
        error.data instanceof Object ? JSON.stringify(error.data) : error.data;
      setErrorMsg(errMsg);
    } else if (isSuccess) {
      reset();
      closeModal();
    }
  }, [error, isSuccess, reset]);

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
        <HighlightOff className="close" onClick={closeModal} />
        <h1>Add new {slug}</h1>
        {errorMsg.length > 0 && (
          <div className="error">
            <ErrorOutline />
            <span>{errorMsg}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.hasOwnProperty("required"))
            .map((column) => (
              <div
                className="item"
                key={column.field}
                style={{
                  width: column.inputType === "textarea" ? "100%" : "45%",
                }}
              >
                <label htmlFor={column.field}>
                  {column.headerName}
                  {column.required && <span>*</span>}
                </label>
                {column.inputType === "textarea" ? (
                  <textarea
                    name={column.field}
                    id={column.field}
                    onChange={handleChange}
                    required={column.required}
                    placeholder={column.placeholder || column.headerName}
                  />
                ) : column.inputType === "select" && slug === "order" ? (
                  <div className="select">
                    <select
                      name={column.field}
                      onChange={handleChange}
                      defaultValue="pending"
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
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a type
                      </option>
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
                    onChange={handleChange}
                    required={column.required}
                    step={
                      column.field === "price" || column.field === "amount"
                        ? 0.01
                        : undefined
                    }
                    min={column.inputType === "number" ? 0.01 : undefined}
                    max={column.inputType === "number" ? 99999.99 : undefined}
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
