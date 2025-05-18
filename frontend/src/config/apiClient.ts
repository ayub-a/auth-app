import axios, { type CreateAxiosDefaults } from 'axios'


const options: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
}


export const api = axios.create(options)


api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const { status, data } = error.response
        return Promise.reject({ status, ...data })
    } 
)

