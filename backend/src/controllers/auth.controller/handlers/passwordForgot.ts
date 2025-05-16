import { NextFunction, Request, Response } from "express"

import { authService } from "../../../services/auth.service"
import { HTTP_STATUS } from "../../../constants/http"
import { AuthSchema } from "../auth.schema"


export async function passwordForgot(req: Request, res: Response, next: NextFunction) {
    try {
        const email = AuthSchema.emailSchema.parse(req.body.email)

        await authService.passwordForgot(email)

        res
            .status(HTTP_STATUS.OK)
            .json({ message: 'Password reset email sent.' })
    } catch (error) {
        next(error)
    }
}
