import { NextFunction, Request, Response } from "express"

import { authService } from "../../../services/auth.service"
import { cookieService } from "../../../services/cookie.service"

import { HTTP_STATUS } from "../../../constants/http"
import { AuthSchema } from "../auth.schema"


export async function passwordReset(req: Request, res: Response, next: NextFunction) {
    try {
        const payload = AuthSchema.resetPasswordSchema.parse(req.body)

        await authService.passwordReset(payload)

        cookieService
            .clearAuthCookies(res)
            .status(HTTP_STATUS.OK)
            .json({ message: 'Password reset successful.' })
    } catch (error) {
        next(error)
    }
}
