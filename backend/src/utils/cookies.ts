import { CookieOptions, Response } from "express"
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date"


const REFRESH_PATH = '/auth/refresh'

const defaults: CookieOptions = {
    sameSite: 'strict',
    httpOnly: true,
    secure: true
}


const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow()
})


const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: REFRESH_PATH
}) 


interface IParams {
    res: Response
    accessToken: string
    refreshToken: string
}

export const setAuthCookies = ({ res, accessToken, refreshToken }: IParams) =>
    res
        .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
        .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions())


export const clearAuthCookies = (res: Response) => 
    res
        .clearCookie('accessToken')
        .clearCookie('refreshToken', {
            path: REFRESH_PATH
        })
