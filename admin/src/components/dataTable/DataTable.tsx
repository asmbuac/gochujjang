import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import {
  DeleteOutline,
  EditOutlined,
  PageviewOutlined,
} from "@mui/icons-material";
import { useDeleteRowMutation } from "../../redux/apiSlice";
import { useState } from "react";
import EditModal from "../editModal/EditModal";
import { ColumnInfo } from "../../types";

type Props = {
  columns: ColumnInfo[];
  rows: GridRowsProp;
  slug: string;
  hiddenColumns?: GridColumnVisibilityModel;
};

const DataTable: React.FC<Props> = ({ columns, rows, slug, hiddenColumns }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [deleteRow] = useDeleteRowMutation();

  const handleDelete = (slug: string, id: string) => {
    deleteRow({ slug, id });
  };

  const openEditModel = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    const { createdAt, updatedAt, __v, password, ...others } = params.row;
    if (slug === "orders") {
      others.products = others.products
        .map(
          (item: { [key: string]: any }) =>
            `${item.product._id} ${item.quantity}`
        )
        .join(", ");
    }
    setFormData(others);
    setOpen(true);
  };

  const actionColumn: GridColDef = {
    field: "actions",
    type: "actions",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${slug}/${params.row._id}`}>
            <PageviewOutlined className="view" />
          </Link>
          <EditOutlined
            className="edit"
            onClick={() => openEditModel(params)}
          />
          <DeleteOutline
            className="delete"
            onClick={() => handleDelete(slug, params.row._id)}
          />
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
      {open && (
        <EditModal
          slug={slug.slice(0, -1)}
          columns={columns}
          setOpen={setOpen}
          setFormData={setFormData}
          formData={formData}
        />
      )}
    </div>
  );
};

export default DataTable;
