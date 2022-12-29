import axios from "axios";

export default axios.create({
  baseURL: "http://62.84.113.142:8040/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});
