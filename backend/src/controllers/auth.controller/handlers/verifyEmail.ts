import { NextFunction, Request, Response } from "express"

import { authService } from "../../../services/auth.service"
import { HTTP_STATUS } from "../../../constants/http"
import { AuthSchema } from "../auth.schema"


export async function verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const verificationCode = AuthSchema.verifyEmailCodeShema.parse(req.params.code)

        await authService.verifyEmail(verificationCode)

        res
            .status(HTTP_STATUS.OK)
            .json({ message: 'Your email was verified!' })
    } catch (error) {
        next(error)
    }
}
