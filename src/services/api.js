import axios from "axios";
const api = axios.create({
  baseURL: "https://love-repository.vercel.app/",
});

export default api;
