import {
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useState } from "react";
import AddModal from "../../components/addModal/AddModal";
import { Add } from "@mui/icons-material";
import { useGetRowsQuery } from "../../redux/apiSlice";
import { ColumnInfo } from "../../types";

export const columns: ColumnInfo[] = [
  { field: "_id", headerName: "ID" },
  {
    field: "avatar",
    type: "string",
    headerName: "Avatar",
    width: 75,
    inputType: "url",
    required: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <img src={params.row.avatar || "/src/assets/noavatar.png"} alt="" />
      );
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
    inputType: "text",
    required: true,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
    inputType: "text",
    required: true,
  },
  {
    field: "username",
    type: "string",
    headerName: "Username",
    width: 100,
    inputType: "text",
    required: true,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
    inputType: "email",
    required: true,
  },
  {
    field: "password",
    headerName: "Password",
    inputType: "password",
    required: true,
  },
  {
    field: "confirmPassword",
    headerName: "Confirm Password",
    inputType: "password",
    required: true,
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
    field: "isAdmin",
    headerName: "Admin",
    width: 100,
    type: "boolean",
    inputType: "checkbox",
    required: false,
  },
];

const hiddenColumns = {
  password: false,
  confirmPassword: false,
};

const Users = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { data, isLoading } = useGetRowsQuery("users");

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>
          <Add />
          <span>Add New User</span>
        </button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable
          columns={columns}
          rows={data}
          slug="users"
          hiddenColumns={hiddenColumns}
        />
      )}
      {open && (
        <AddModal
          slug="user"
          columns={columns}
          setOpen={setOpen}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default Users;
