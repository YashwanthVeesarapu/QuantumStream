import axios from "axios";

let dev = false;

if (window.location.hostname === "localhost") {
  dev = true;
}

const serverUrl = dev ? "http://localhost:8000" : "https://api.redsols.us";

export const apiInstance = axios.create({
  baseURL: serverUrl,
});
