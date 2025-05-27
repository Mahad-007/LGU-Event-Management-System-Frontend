import axios from './axios';

// SIGNUP
export const signupUser = async (formData) => {
    const response = await axios.post('/signup', formData);
    return response.data;
};

// LOGIN
export const loginUser = async (formData) => {
    const response = await axios.post('/login', formData);
    return response.data;
};
