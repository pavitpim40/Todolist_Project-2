import { notification } from 'antd';
import axios from 'axios';
import LocalStorageService from '../services/localStorageService';

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.request.use(
    config => {
        if(config.url.includes("/login") || config.url.includes("/register")) return config;

        const token = LocalStorageService.getToken();
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config
    },
    err => {
        Promise.reject(err);
    }

)

axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        if(err.response && err.response.status === 401){
            LocalStorageService.removeToken();
            window.location.reload();
            notification.err({
                message: "กรุณาเข้าสู่ระบบใหม่"
            });
            return Promise.reject();
        }
        return Promise.reject();
    }
)
export default axios;