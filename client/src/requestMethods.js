import axios from "axios";

const BASE_URL = "http://localhost:8000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTM5OTliYzJjMDYxOGNhYjY0MGNmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4OTA0NzIwNywiZXhwIjoxNjg5MzA2NDA3fQ.0i8lb4nIoeNWTOt7sxYZLfH8sNaYYDhkA5B6xeFzLuY";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`
  }
});
