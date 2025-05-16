import { NextFunction, Request, Response } from "express"

import { authService } from "../../../services/auth.service"
import { cookieService } from "../../../services/cookie.service"
import { HTTP_STATUS } from "../../../constants/http"

import { AuthSchema } from "../auth.schema"


export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const request = AuthSchema.registerSchema.parse({
            ...req.body,
            userAgent: req.headers['user-agent']
        })

        const { user, accessToken, refreshToken } = await authService.createAccount(request)

        cookieService
            .setAuthCookies({ res, accessToken, refreshToken })
            .status(HTTP_STATUS.CREATED)
            .json(user)
    } catch(error) {
        next(error)
    }
}
