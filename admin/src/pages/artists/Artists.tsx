import "./artists.scss";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useGetRowsQuery } from "../../redux/apiSlice";
import DataTable from "../../components/dataTable/DataTable";
import { ColumnInfo } from "../../types";
import { GridRenderCellParams } from "@mui/x-data-grid";
import AddModal from "../../components/addModal/AddModal";

export const columns: ColumnInfo[] = [
  {
    field: "img",
    type: "string",
    headerName: "Image",
    inputType: "url",
    required: true,
    renderCell: (params: GridRenderCellParams) => {
      return <img src={params.row.img || "/src/assets/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 250,
    inputType: "text",
    required: true,
  },
  {
    field: "logo",
    type: "string",
    headerName: "Logo",
    inputType: "url",
    required: false,
  },
  {
    field: "type",
    type: "string",
    headerName: "Type",
    width: 250,
    inputType: "select",
    required: true,
  },
];

const hiddenColumns = {
  logo: false,
};

const Artists = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    name: "",
    img: "",
    type: "",
  });
  const { data, isLoading } = useGetRowsQuery("artists");

  return (
    <div className="artists">
      <div className="info">
        <h1>Artists</h1>
        <button onClick={() => setOpen(true)}>
          <Add />
          <span>Add New Artist</span>
        </button>
      </div>
      {isLoading ? (
        "Loading"
      ) : (
        <DataTable
          columns={columns}
          rows={data}
          slug="artists"
          hiddenColumns={hiddenColumns}
        />
      )}
      {open && (
        <AddModal
          slug="artist"
          columns={columns}
          setOpen={setOpen}
          setFormData={setFormData}
          formData={formData}
        />
      )}
    </div>
  );
};

export default Artists;
