import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { DeleteOutline, PageviewOutlined } from "@mui/icons-material";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable: React.FC<Props> = ({ columns, rows, slug }) => {
  const handleDelete = (id: number) => {
    // Delete item
    console.log(id + " has been deleted");
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${slug}/${params.row.id}`}>
            <PageviewOutlined style={{ fill: "limegreen" }} />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteOutline style={{ fill: "tomato" }} />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
