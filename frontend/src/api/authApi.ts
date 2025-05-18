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
    private static readonly VERIFY_EMAIL_PATH = '/auth/email/verify'


    async login(data: ILoginParams) {
        return await api.post(AuthApi.LOGIN_PATH, data)
    }


    async register(data: IRegisterParams) {
        return await api.post(AuthApi.REGISTER_PATH, data)
    }


    async verifyEmail(code: string) {
        return await api.get(`${AuthApi.VERIFY_EMAIL_PATH}/${code}`)
    }

}


export const authApi = new AuthApi()
