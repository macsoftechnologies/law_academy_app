import axios from 'axios';

const api = axios.create({
  baseURL: 'http://175.101.46.196:3001', 
  timeout: 15000,
});

export default api;