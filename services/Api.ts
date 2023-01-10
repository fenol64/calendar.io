import axios from 'axios';

export const appApi = axios.create({
    baseURL: '/api',
});

export const whatsappApi = axios.create({
    baseURL: 'http://api.apphub.com.br/whatsapp',
    params: {
        key: process.env.WHATSAPP_API_KEY,
    }
})
