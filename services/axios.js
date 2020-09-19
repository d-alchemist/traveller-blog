import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://travel-blogger.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
})

export default instance;