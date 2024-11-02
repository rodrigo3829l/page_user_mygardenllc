import axios from "axios";
import { currentLanguage } from "@/store/languajeStore";

export const api = axios.create({
  // baseURL: 'https://db-api-mygarden.onrender.com/api',
  // baseURL: "https://db-api-mygarden-llc.onrender.com/api",
  // baseURL: ' https://b572-2806-10a6-10-5f6a-7143-4c42-61fd-a25.ngrok-free.app/api',
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = currentLanguage.value;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
