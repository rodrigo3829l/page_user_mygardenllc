import axios from 'axios'

export const api = axios.create({
  // baseURL: 'https://apifortheproject.onrender.com/api/v1',
  // baseURL: 'https://project-api-omega.vercel.app/api/v1',
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
})

