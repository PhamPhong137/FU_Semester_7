import { getAuth } from "@/stores/auth-store"
import axios from "axios"

const BASE_URL = "https://backend.mind-gpt.online"
const AUTH_SERVICE = "https://auth.mind-gpt.online"

export const instance = axios.create({
    baseURL: BASE_URL,
})

instance.interceptors.request.use(function (config) {
    const token = getAuth().token
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export const authInstance = axios.create({
    baseURL: AUTH_SERVICE,
})

authInstance.interceptors.request.use(function (config) {
    const token = getAuth().token
    config.headers.Authorization = `Bearer ${token}`
    return config
})
