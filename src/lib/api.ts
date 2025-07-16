import axios from 'axios';
import Cookies from 'js-cookie';
import { decryptData } from './crypto';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // const token = getItemLocalStore('^token') as string | null;
  // if (token) {
  //   const user = getDataFromToken(token);
  //   if (user.accessToken) {
  //     config.headers.Authorization = `Bearer ${user.accessToken}`;
  //   }
  // }
  const encryptedToken = Cookies.get('token_info');
  if (encryptedToken) {
    try {
      const token_info = decryptData(encryptedToken); // Giải mã token

      if (token_info) {
        config.headers.Authorization = `Bearer ${token_info.accessToken}`;
      }
    } catch (err) {
      console.error('Lỗi giải mã token từ cookie:', err);
    }
  }

  return config;
});

export default api;
