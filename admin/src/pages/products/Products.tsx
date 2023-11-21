import { useState } from "react";
import AddModal from "../../components/addModal/AddModal";
import DataTable from "../../components/dataTable/DataTable";
import { products } from "../../data";
import "./products.scss";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 75 },
  {
    field: "img",
    headerName: "Image",
    width: 75,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 275,
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
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
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
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      <DataTable columns={columns} rows={products} slug="products" />
      {open && <AddModal slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
