import axios from "axios";

let base = "http://localhost:8083";
if (import.meta.env.PROD) {
  base = "https://pet.linze.pro";
}
const api = axios.create({
  baseURL: `${base}/api`,
});

export default api;
