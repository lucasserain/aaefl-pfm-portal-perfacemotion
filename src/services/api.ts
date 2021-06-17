import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aaefl-pfm-api-midias.herokuapp.com/',
});
export default api;
