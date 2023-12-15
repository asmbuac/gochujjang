import { GridColDef } from "@mui/x-data-grid";

export type ColumnInfo = GridColDef & {
  inputType?: string;
  required?: boolean;
  placeholder?: string;
};

export type Product = {
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
  categories?: string | string[];
  size?: string | string[];
  color?: string | string[];
  price?: number;
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type Order = {
  _id?: string;
  userId?: string;
  sessionId?: string;
  products?: object[] | string[] | string;
  amount?: number;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type User = {
  _id?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
