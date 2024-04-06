import axios from 'axios'
import { currentLanguage } from '@/store/languajeStore';

export const api = axios.create({
  // baseURL: 'https://db-api-mygarden.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'http://192.168.1.68:5000/api',
  withCredentials: true
})

api.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = currentLanguage.value;
  return config;
}, (error) => {
  return Promise.reject(error);
});