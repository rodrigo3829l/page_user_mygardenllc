import axios from 'axios'

export const api = axios.create({
  // baseURL: 'https://db-api-mygarden.onrender.com/api',
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
})

