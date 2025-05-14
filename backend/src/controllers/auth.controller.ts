import { NextFunction, Request, Response } from "express"
import { z } from "zod"

import { authService } from "../services/auth.service"
import { HTTP_STATUS } from "../constants/http"
import { setAuthCookies } from "../utils/cookies"


const registerSchema = z
    .object({
        email: z.string().email().min(8).max(255),
        password: z.string().min(6).max(255),
        confirmPassword: z.string().min(6).max(255),
        userAgent: z.string().optional()
    }).refine(
        (data) => data.password === data.confirmPassword, {
            message: 'Password do not match.',
            path: ['confirmPassword']
        }
    )


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


}


export const authController = new AuthController()
