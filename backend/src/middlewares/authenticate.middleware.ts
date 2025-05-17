import { RequestHandler } from "express";

import { HTTP_STATUS } from "../constants/http";
import { EAappErrorCode } from "../constants/appErrorCode";

import { tokenService } from "../services/token.service";
import { appAssert } from "../utils/appAssert";


export const authenticateMiddleware: RequestHandler = (req, res, next) => {
    const accessToken = req.cookies.accessToken as string | undefined
    appAssert(
        accessToken, 
        HTTP_STATUS.UNAUTHORIZED, 
        'Not Authorized', 
        EAappErrorCode.InvalidAccessToken
    )

    const { payload, error } = tokenService.verify(accessToken)
    appAssert(
        payload, 
        HTTP_STATUS.UNAUTHORIZED, 
        error === 'jwt expired' ? 'Token expireed' : 'Invalid token', 
        EAappErrorCode.InvalidAccessToken
    )

    req.userId = payload.userId
    req.sessionId = payload.sessionId
    next()
}
