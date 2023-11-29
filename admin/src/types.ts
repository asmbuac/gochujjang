import { GridColDef } from "@mui/x-data-grid";

export type ColumnInfo = GridColDef & {
  inputType?: string;
  required?: boolean;
};

export type Product = {
  title?: string;
  description?: string;
  image?: string;
  categories?: string | string[];
  size?: string | string[];
  color?: string | string[];
  price?: number;
  inStock?: boolean;
};
