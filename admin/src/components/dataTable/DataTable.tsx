import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { DeleteOutline, PageviewOutlined } from "@mui/icons-material";
import { useDeleteRowMutation } from "../../redux/apiSlice";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  hiddenColumns?: GridColumnVisibilityModel;
};

const DataTable: React.FC<Props> = ({ columns, rows, slug, hiddenColumns }) => {
  const [deleteRow] = useDeleteRowMutation();

  const handleDelete = (slug: string, id: string) => {
    deleteRow({ slug, id });
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${slug}/${params.row._id}`}>
            <PageviewOutlined style={{ fill: "limegreen" }} />
          </Link>
          <div
            className="delete"
            onClick={() => handleDelete(slug, params.row._id)}
          >
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
        columnVisibilityModel={hiddenColumns}
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
