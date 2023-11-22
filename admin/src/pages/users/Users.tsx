import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { userRows } from "../../data";
import { useState } from "react";
import AddModal from "../../components/addModal/AddModal";
import { Add } from "@mui/icons-material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 75 },
  {
    field: "img",
    headerName: "Avatar",
    width: 75,
    renderCell: (params: GridRenderCellParams) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 100,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>
          <Add />
          <span>Add New User</span>
        </button>
      </div>
      <DataTable columns={columns} rows={userRows} slug="users" />
      {open && <AddModal slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
