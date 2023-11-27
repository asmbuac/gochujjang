import { useState } from "react";
import AddModal from "../../components/addModal/AddModal";
import DataTable from "../../components/dataTable/DataTable";
import "./products.scss";
import { Add } from "@mui/icons-material";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 75 },
  {
    field: "image",
    headerName: "Image",
    width: 75,
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
  },
  {
    field: "color",
    type: "string",
    headerName: "Color",
    width: 125,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 125,
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
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>
          <Add />
          <span>Add New Product</span>
        </button>
      </div>
      {/* {isPending ? (
        "Loading..."
      ) : ( */}
      <DataTable columns={columns} rows={data} slug="products" />
      {/* )} */}
      {open && <AddModal slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
