import { NextFunction, Request, Response } from "express"

import { authService } from "../../../services/auth.service"
import { cookieService } from "../../../services/cookie.service"
import { HTTP_STATUS } from "../../../constants/http"

import { AuthSchema } from "../auth.schema"


export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        
        const request = AuthSchema.loginSchema.parse({
            ...req.body,
            userAgent: req.headers['user-agent']
        })

        const { accessToken, refreshToken } = await authService.login(request)

        cookieService
            .setAuthCookies({ res, accessToken, refreshToken })
            .status(HTTP_STATUS.OK)
            .json({ message: 'Login successful!' })
    } catch (error) {
        next(error)
    }
}