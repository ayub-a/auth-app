import { Router } from "express";
import { authController } from "../controllers/auth/auth.controller";


const authRouter = Router()


authRouter
    .post('/register', authController.register)

    .post('/login', authController.login)
    
    .get('/logout', authController.logout)

    .get('/refresh', authController.refresh)


export default authRouter
