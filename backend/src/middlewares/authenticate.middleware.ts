import { RequestHandler } from "express";

import { HTTP_STATUS } from "../constants/http";
import { EAappErrorCode } from "../constants/appErrorCode";

import { tokenService } from "../services/token.service";
import { SessionModel } from "../models/session.model";
import { appAssert } from "../utils/appAssert";


export const authenticateMiddleware: RequestHandler = async (req, res, next) => {
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


    const user = await SessionModel.findOne({
        _id: payload.sessionId,
        userId: payload.userId
    })
    appAssert(user, HTTP_STATUS.NOT_FOUND, 'Session was deleted or expired', EAappErrorCode.SessionDeleted)

    
    req.userId = payload.userId
    req.sessionId = payload.sessionId
    next()
}
