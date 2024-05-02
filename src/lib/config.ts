import axios from "axios";

let dev = false;

if (window.location.hostname === "localhost") {
  dev = true;
}

// dev = false;

const serverUrl = dev ? "http://127.0.0.1:8080" : "https://api.redsols.us";

export const apiInstance = axios.create({
  baseURL: serverUrl,
});
