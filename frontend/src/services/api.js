import axios from 'axios';

const api = axios.create({
    baseURL: 'https://distrisec-1580625634.us-east-1.elb.amazonaws.com:3333',
})

export default api;