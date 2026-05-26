import axios from "axios";

const api = axios.create({
  baseURL: "https://breathe-esg-backend-itnd.onrender.com/api/",
});

export default api;