import axios from "axios";

export default axios.create({
  baseURL: "http://158.160.47.208:8040/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});
