import axios from "axios";

const BASE_URL = 'http://localhost:4001/'

export const apiInstance= axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    credentials: 'include'
})

apiInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})