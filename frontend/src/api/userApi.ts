import { api } from "../config/apiClient"


interface IUserReturnType {
    email: string
    verified: boolean
    createdAt: Date
}


class UserApi {

    private static readonly USER_PATH = '/user'

    async getUser() {
        const response = await api.get<void, IUserReturnType>(UserApi.USER_PATH)
        return response
    }

}


export const userApi = new UserApi()
