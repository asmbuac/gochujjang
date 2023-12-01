import { GridColDef } from "@mui/x-data-grid";

export type ColumnInfo = GridColDef & {
  inputType?: string;
  required?: boolean;
  placeholder?: string;
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

export type Order = {
  userId?: string;
  sessionId?: string;
  products?: object[] | string[] | string;
  amount?: number;
  address?: string;
};
