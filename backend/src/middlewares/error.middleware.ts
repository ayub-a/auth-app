import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";

import { HTTP_STATUS } from "../constants/http";
import { EAappErrorCode } from "../constants/appErrorCode";

import { CookieService, cookieService } from "../services/cookie.service";
import { authService } from "../services/auth.service";

import { AppError } from "../utils/AppError";


const handleZodError = (res: Response, err: z.ZodError) => {

    const errors = err.issues.map((err) => ({ 
        path: err.path.join('.'),
        message: err.message
    }))

    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message, errors })
}


const handleAppError = (res: Response, error: AppError) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
    })
}


export const errorMiddleware: ErrorRequestHandler = async (err, req, res, next) => {
    console.log(`\n PATH: ${req.path}`, err.toString())

    if (req.path === CookieService.REFRESH_PATH) {
        cookieService.clearAuthCookies(res)
    }


    if (err.errorCode === EAappErrorCode.SessionDeleted) {
        await authService.logout(req.cookies.accessToken)
        cookieService.clearAuthCookies(res)
    }


    if (err instanceof z.ZodError) {
        handleZodError(res, err)
        return
    }


    if (err instanceof AppError) {
        handleAppError(res, err)
        return
    }

    
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(err.message)
    return
}
