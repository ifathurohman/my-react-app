import axios from 'axios';

const url = import.meta.env.VITE_API_SERVICE;

export default axios.create({
  baseURL: url,
  headers: {
    // 'Content-type': 'application/json',
    'Content-type': 'multipart/form-data',
  },
});


