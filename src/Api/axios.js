import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your actual backend URL
    withCredentials: true, // Optional: if cookies/sessions are used
});

export default instance;
