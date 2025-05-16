import { NextFunction, Request, Response } from "express"

import { authService } from "../../../services/auth.service"
import { cookieService } from "../../../services/cookie.service"

import { HTTP_STATUS } from "../../../constants/http"


export async function logout(req: Request,res: Response, next: NextFunction) {
    try {
        const { accessToken } = req.cookies

        await authService.logout(accessToken)
        
        cookieService
            .clearAuthCookies(res)
            .status(HTTP_STATUS.OK)
            .json({ message: 'You logged out!' })
    } catch (error) {
        next(error)
    }
}