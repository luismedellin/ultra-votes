import axios from 'axios';

const masterDataApi = axios.create({
    baseURL: process.env.REACT_APP_ULTRA_VOTES_URL
});

masterDataApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    };

    return config;
})

export default masterDataApi;