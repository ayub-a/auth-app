import { NextFunction, Request, Response } from "express"

import { authService } from "../../services/auth.service"
import { CookieService, cookieService } from "../../services/cookie.service"
import { HTTP_STATUS } from "../../constants/http"

import { AuthSchema } from "./auth.schema"


class AuthController {

    async register(req: Request, res: Response, next: NextFunction) {
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


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            
            const request = AuthSchema.loginSchema.parse({
                ...req.body,
                userAgent: req.headers['user-agent']
            })

            const { user, accessToken, refreshToken } = await authService.login(request)

            cookieService
                .setAuthCookies({ res, accessToken, refreshToken })
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
            
            cookieService
                .clearAuthCookies(res)
                .status(HTTP_STATUS.OK)
                .json({ message: 'You logged out!' })
        } catch (error) {
            next(error)
        }
    }


    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies

            const { accessToken, newRefreshToken } = await authService.refreshUserAccessToken(refreshToken)

            if (newRefreshToken) {
                res.cookie(CookieService.REFRESH_TOKEN, newRefreshToken, CookieService.refreshTokenCookieOptions)
            }

            res
                .cookie(CookieService.ACCESS_TOKEN, accessToken, CookieService.accessTokenCookieOptions)
                .status(HTTP_STATUS.OK)
                .json({ message: 'Access token refreshed!' })
        } catch (error) {
            next(error)
        }
    }


    async verifyEmail(req: Request, res: Response, next: NextFunction) {
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


    async passwordForgot(req: Request, res: Response, next: NextFunction) {
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

}


export const authController = new AuthController()
