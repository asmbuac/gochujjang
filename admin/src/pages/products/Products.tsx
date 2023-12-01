import { useState } from "react";
import AddModal from "../../components/addModal/AddModal";
import DataTable from "../../components/dataTable/DataTable";
import "./products.scss";
import { Add } from "@mui/icons-material";
import {
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useGetRowsQuery } from "../../redux/apiSlice";
import { ColumnInfo } from "../../types";

const columns: ColumnInfo[] = [
  { field: "_id", headerName: "ID", width: 75 },
  {
    field: "image",
    type: "string",
    headerName: "Image",
    width: 75,
    inputType: "url",
    required: true,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <img src={params.row.image || "/src/assets/noavatar.png"} alt="" />
      );
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 400,
    inputType: "text",
    required: true,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    inputType: "textarea",
    required: true,
  },
  {
    field: "categories",
    type: "string",
    headerName: "Categories",
    inputType: "text",
    required: false,
  },
  {
    field: "size",
    type: "string",
    headerName: "Size",
    inputType: "text",
    required: false,
  },
  {
    field: "color",
    type: "string",
    headerName: "Color",
    width: 125,
    inputType: "text",
    required: false,
  },
  {
    field: "price",
    type: "number",
    headerName: "Price",
    width: 125,
    inputType: "number",
    required: true,
    valueFormatter: (params: GridValueFormatterParams) => `$${params.value}`,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 175,
    type: "string",
    valueFormatter: (params: GridValueFormatterParams) =>
      new Date(params.value).toLocaleString(),
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 100,
    type: "boolean",
    inputType: "checkbox",
    required: false,
  },
];

const hiddenColumns = {
  categories: false,
  size: false,
  color: false,
  description: false,
};

const Products = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    title: "",
    description: "",
    image: "",
    price: 0,
    inStock: false,
  });
  const { data, isLoading } = useGetRowsQuery("products");

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>
          <Add />
          <span>Add New Product</span>
        </button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable
          columns={columns}
          rows={data}
          slug="products"
          hiddenColumns={hiddenColumns}
        />
      )}
      {open && (
        <AddModal
          slug="product"
          columns={columns}
          setOpen={setOpen}
          setFormData={setFormData}
          formData={formData}
        />
      )}
    </div>
  );
};

export default Products;
