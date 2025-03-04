import axios from "axios";

const API = axios.create({
  baseURL: "https://arogo-ai-backend.onrender.com/api",
});

export default API;
