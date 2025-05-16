import { Router } from "express";
import { authController } from "../controllers/auth/auth.controller";


const authRouter = Router()


authRouter
    .post('/register', authController.register)

    .post('/login', authController.login)

    .post('/password/forgot', authController.passwordForgot)

    .post('/password/reset', authController.passwordReset)
    
    .get('/logout', authController.logout)

    .get('/refresh', authController.refresh)

    .get('/email/verify/:code', authController.verifyEmail)


export default authRouter
