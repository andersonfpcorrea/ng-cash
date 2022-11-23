import axios from "axios";

const host = "http://localhost:3001/api/v1/";

const api = axios.create({
  baseURL: host,
});

export default api;
