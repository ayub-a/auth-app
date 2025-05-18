import { api } from "../config/apiClient"


interface ILoginParams {
    email: string
    password: string
}

interface IRegisterParams extends ILoginParams {
    confirmPassword: string
}


class AuthApi {

    private static readonly LOGIN_PATH = '/auth/login'
    private static readonly REGISTER_PATH = '/auth/register'


    async login(data: ILoginParams) {
        await api.post(AuthApi.LOGIN_PATH, data)
    }


    async register(data: IRegisterParams) {
        await api.post(AuthApi.REGISTER_PATH, data)
    }

}


export const authApi = new AuthApi()
