import axios from 'axios';
export const BASE_URL = 'https://photomemorybackend-production.up.railway.app';

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});