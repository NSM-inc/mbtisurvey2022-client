import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.defaults.timeout = 2500;

api.defaults.headers.post['Content-Type'] = 'application-json';

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error(`Request ${error}`);
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => {
        const res = response.data;
        return res;
    },
    (error) => {
        console.error(`Response ${error}`);
        return Promise.reject(error);
    },
);

export default api;
