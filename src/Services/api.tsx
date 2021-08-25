import axios from "axios";

export const api = axios.create({
  baseURL: "https://kenzieshop2.herokuapp.com",
});
