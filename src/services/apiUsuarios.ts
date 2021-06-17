import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aaefl-pfm-api-usuarios.herokuapp.com/',
});
export default api;
