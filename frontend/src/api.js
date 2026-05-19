import axios from "axios";

const API = axios.create({
  baseURL: "https://ese-aifsd-final.onrender.com/api"
});

export default API;

