import axios from 'axios';
import promise from 'promise';

const instance  = axios.create();

instance.interceptors.request.use( config => {
    const AUTH_TOKEN = localStorage.getItem('current_user');

    if(AUTH_TOKEN) {
        if(config.method !== 'OPTIONS') {
            config.headers.AUTHORIZATION = `Bearer ${AUTH_TOKEN}`;
        }
    }
    return config
}, (error) => {
    return promise.reject(error);
});

export default instance;