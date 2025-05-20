import axios, { type AxiosError, type CreateAxiosDefaults } from 'axios'
import { apiError, type TApiErrorData } from '../lib/apiError'


const options: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
}


export const api = axios.create(options)


export const tokenrefreshClient = axios.create(options)
tokenrefreshClient.interceptors.response.use((response) => response.data)


api.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError<TApiErrorData>) => {
        const result = await apiError.handle(error);
        if (result) return result;

        return Promise.reject({
            status: error.response?.status,
            data: error.response?.data,
        });
    } 
)
