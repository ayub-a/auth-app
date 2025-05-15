import { CookieOptions, Response } from "express"
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "../utils/date"


interface IParams {
    res: Response
    accessToken: string
    refreshToken: string
}


class CookieService {

    private static readonly REFRESH_PATH = '/auth/refresh'

    private static readonly defaults: CookieOptions = {
        sameSite: 'strict',
        httpOnly: true,
        secure: true
    }

    private static getAccessTokenCookieOptions(): CookieOptions {
        return {
            ...CookieService.defaults,
            expires: fifteenMinutesFromNow()
        }
    }

    private static getRefreshTokenCookieOptions(): CookieOptions {
        return {
            ...CookieService.defaults,
            expires: thirtyDaysFromNow(),
            path: CookieService.REFRESH_PATH
        }
    } 


    setAuthCookies({ res, accessToken, refreshToken }: IParams) {
        return res
        .cookie('accessToken', accessToken, CookieService.getAccessTokenCookieOptions())
        .cookie('refreshToken', refreshToken, CookieService.getRefreshTokenCookieOptions())
    }


    clearAuthCookies(res: Response) {
        return res
        .clearCookie('accessToken')
        .clearCookie('refreshToken', {
            path: CookieService.REFRESH_PATH
        })
    }

}


export const cookiesService = new CookieService()
