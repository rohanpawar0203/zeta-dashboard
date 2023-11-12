import axios from "axios";
const API_URL = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem('token');
const AutomaiteBackend = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  // mode: 'cors',
});

export default AutomaiteBackend;
