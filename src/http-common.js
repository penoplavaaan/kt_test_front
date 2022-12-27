import axios from "axios";

export default axios.create({
  baseURL: "http://51.250.90.3:8040/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});
