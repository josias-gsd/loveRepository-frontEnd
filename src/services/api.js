import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:9002" });

export default api;
