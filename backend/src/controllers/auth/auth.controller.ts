import { NextFunction, Request, Response } from "express"

import { authService } from "../../services/auth.service"
import { clearAuthCookies, setAuthCookies } from "../../utils/cookies"
import { HTTP_STATUS } from "../../constants/http"

import { loginSchema, registerSchema } from "./auth.schema"


class AuthController {

    async register(req: Request, res: Response, next: NextFunction) {
        try {

            const request = registerSchema.parse({
                ...req.body,
                userAgent: req.headers['user-agent']
            })

            const { user, accessToken, refreshToken } = await authService.createAccount(request)

            setAuthCookies({ res, accessToken, refreshToken })
                .status(HTTP_STATUS.CREATED)
                .json(user)
        } catch(error) {
            next(error)
        }
    }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            
            const request = loginSchema.parse({
                ...req.body,
                userAgent: req.headers['user-agent']
            })

            const { user, accessToken, refreshToken } = await authService.login(request)

            setAuthCookies({ res, accessToken, refreshToken })
                .status(HTTP_STATUS.OK)
                .json({ message: 'Login successful!' })
        } catch (error) {
            next(error)
        }
    }


    async logout(req: Request,res: Response, next: NextFunction) {
        try {
            const { accessToken } = req.cookies

            await authService.logout(accessToken)
            
            clearAuthCookies(res)
                .status(HTTP_STATUS.OK)
                .json({ message: 'You logged out!' })
        } catch (error) {
            next(error)
        }
    }

}


export const authController = new AuthController()
