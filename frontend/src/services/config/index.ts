import axios from "axios";

const host = process.env.REACT_APP_HOST ?? "http://localhost:3001/api/v1";

const api = axios.create({
  baseURL: `${host}`,
});

export default api;
