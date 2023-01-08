import axios from 'axios';

export const appApi = axios.create({
    baseURL: '/api',
});
