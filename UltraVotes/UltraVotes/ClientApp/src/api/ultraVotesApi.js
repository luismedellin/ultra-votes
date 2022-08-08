import axios from 'axios';

const ultraVotesApi = axios.create({
    baseURL: process.env.REACT_APP_ULTRA_VOTES_URL
});

ultraVotesApi.interceptors.request.use( config => {

    const authorization = `Bearer ${localStorage.getItem('token')}`;

    config.headers = {
        ...config.headers,
        'Authorization': authorization
    };

    return config;
})

export default ultraVotesApi;