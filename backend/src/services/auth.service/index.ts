import { createAccount } from "./createAccount";
import { login } from "./login";
import { logout } from "./logout";
import { refreshUserAccessToken } from "./refreshUserAccessToken";


export interface IAuthParams {
    email: string
    password: string
    userAgent?: string
}


export const authService = {
    createAccount,
    login,
    logout,
    refreshUserAccessToken
}
