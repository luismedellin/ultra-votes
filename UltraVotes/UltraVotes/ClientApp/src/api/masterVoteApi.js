import axios from 'axios';

const masterVoteApi = axios.create({
    baseURL: process.env.REACT_APP_ULTRA_VOTES_URL
});

masterVoteApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default masterVoteApi;