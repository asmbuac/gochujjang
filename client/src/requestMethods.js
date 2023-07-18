import axios from "axios";
import { store } from "./redux/store";

const BASE_URL = "http://localhost:8000/api";
const TOKEN = store.getState().auth.currentUser?.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
