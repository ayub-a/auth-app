import { api } from "../config/apiClient"


interface ILoginParams {
    email: string
    password: string
}

interface IRegisterParams extends ILoginParams {
    confirmPassword: string
}

interface IPasswordResetParams {
    verificationCode: string
    password: string
}


class AuthApi {

    private static readonly LOGIN_PATH = '/auth/login'
    private static readonly LOGOUT_PATH = '/auth/logout'
    private static readonly REGISTER_PATH = '/auth/register'
    private static readonly VERIFY_EMAIL_PATH = '/auth/email/verify'
    private static readonly PASSWORD_FORGOT_PATH = '/auth/password/forgot'
    private static readonly PASSWORD_RESET_PATH = '/auth/password/reset'


    async login(data: ILoginParams) {
        return await api.post(AuthApi.LOGIN_PATH, data)
    }


    async logout() {
        return api.get(AuthApi.LOGOUT_PATH)
    }


    async register(data: IRegisterParams) {
        return await api.post(AuthApi.REGISTER_PATH, data)
    }


    async verifyEmail(code: string) {
        return await api.get(`${AuthApi.VERIFY_EMAIL_PATH}/${code}`)
    }


    async passwordForgot(email: string) {
        return await api.post(AuthApi.PASSWORD_FORGOT_PATH, { email })
    }   


    async passwordReset(payload: IPasswordResetParams) {
        return api.post(AuthApi.PASSWORD_RESET_PATH, payload)
    }


    async refresh() {
        return await api.get('/auth/refresh')
    }

}


export const authApi = new AuthApi()
