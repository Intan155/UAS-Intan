import axios from 'axios';

const CApi = axios.create({
  baseURL: 'https://your-api-endpoint.com', // Ganti dengan endpoint API Anda
});

export default CApi;