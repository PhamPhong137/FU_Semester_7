import axios, { AxiosError, AxiosResponse } from 'axios';
import { AppConfig } from '../util/appInfo';

export const URL_HOST = AppConfig.environmentDevAPI;

const axiosIns = axios.create({
    baseURL: URL_HOST,
    headers: {
        "Content-Type": "application/json",
    },
});


export default axiosIns