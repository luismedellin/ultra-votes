import axios from 'axios';

const masterVoteApi = axios.create({
    baseURL: process.env.REACT_APP_ULTRA_VOTES_URL
});

masterVoteApi.interceptors.request.use( config => {

    const authorization = `Bearer ${localStorage.getItem('token')}`;

    config.headers = {
        ...config.headers,
        'Authorization': authorization
    };

    return config;
})

export default masterVoteApi;