import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.18.1.10:3333'
})

