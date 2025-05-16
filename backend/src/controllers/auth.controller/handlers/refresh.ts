import { NextFunction, Request, Response } from "express"

import { authService } from "../../../services/auth.service"
import { CookieService } from "../../../services/cookie.service"
import { HTTP_STATUS } from "../../../constants/http"


export async function refresh(req: Request, res: Response, next: NextFunction) {
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
