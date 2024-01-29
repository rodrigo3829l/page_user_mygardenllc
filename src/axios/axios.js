import axios from 'axios'

export const api = axios.create({
  // baseURL: 'https://apifortheproject.onrender.com/api/v1',
  // baseURL: 'https://db-api-mygarden-llc.vercel.app/api/v1',
  baseURL: 'https://db-api-mygarden.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  withCredentials: true
})

