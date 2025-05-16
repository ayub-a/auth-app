import { passwordForgot } from "./ passwordForgot";
import { passwordReset } from "./passwordReset";
import { createAccount } from "./createAccount";
import { login } from "./login";
import { logout } from "./logout";
import { refreshUserAccessToken } from "./refreshUserAccessToken";
import { verifyEmail } from "./verifyEmail";


export interface IAuthParams {
    email: string
    password: string
    userAgent?: string
}


export const authService = {
    createAccount,
    login,
    logout,
    refreshUserAccessToken,
    verifyEmail,
    passwordForgot,
    passwordReset
}
