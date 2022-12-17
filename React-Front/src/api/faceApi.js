import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_FACEAUTH_URL } = getEnvVariables();

const faceApi = axios.create({
    baseURL: VITE_FACEAUTH_URL
});

faceApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }



    return config;
});

export default faceApi;