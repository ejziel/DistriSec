import axios from 'axios';

const api = axios.create({
    baseURL: 'http://34.229.72.41:3333',
})

export default api;