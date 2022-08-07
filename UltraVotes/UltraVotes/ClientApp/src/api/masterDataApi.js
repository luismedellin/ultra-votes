import axios from 'axios';

const masterDataApi = axios.create({
    baseURL: process.env.REACT_APP_ULTRA_VOTES_URL
});

masterDataApi.interceptors.request.use(config => {

    const authorization = `Bearer ${localStorage.getItem('token')}`;

    config.headers = {
        ...config.headers,
        'Authorization': authorization
    };

    return config;
})

export default masterDataApi;