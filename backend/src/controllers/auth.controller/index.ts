import { login } from "./handlers/login";
import { logout } from "./handlers/logout";
import { passwordForgot } from "./handlers/passwordForgot";
import { passwordReset } from "./handlers/passwordReset";
import { refresh } from "./handlers/refresh";
import { register } from "./handlers/register";
import { verifyEmail } from "./handlers/verifyEmail";


export const authController = {
    register,
    login,
    logout,
    refresh,
    verifyEmail,
    passwordForgot,
    passwordReset
}
