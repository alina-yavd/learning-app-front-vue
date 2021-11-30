import axios from 'axios';

const $axios = axios.create({
    baseURL: 'https://127.0.0.1:8000/api/',
    headers: {
        Authorization: ''
    }
});

export default $axios