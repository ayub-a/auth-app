import { Router } from "express";
import { authController } from "../controllers/auth/auth.controller";


const authRouter = Router()


authRouter
    .post('/register', authController.register)

    .post('/login', authController.login)
    
    .get('/logout', authController.logout)


export default authRouter
