import { api } from "../config/apiClient"


interface ILoginParams {
    email: string
    password: string
}


class AuthApi {

    private static readonly LOGIN_PATH = '/auth/login'

    async login(data: ILoginParams) {
        await api.post(AuthApi.LOGIN_PATH, data)
    }

}


export const authApi = new AuthApi()
