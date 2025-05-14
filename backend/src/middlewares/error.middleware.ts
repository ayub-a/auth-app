import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";

import { HTTP_RESPONSE } from "../constants/http";


const handleZodError = (res: Response, err: z.ZodError) => {

    const { code, message } = HTTP_RESPONSE.CLIENT_ERROR.BAD_REQUEST

    const errors = err.issues.map((err) => ({ 
        path: err.path.join('.'),
        message: err.message
     }))

    return res.status(code).json({ message, errors })
}


export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`PATH: ${req.path}`, err)

    if (err instanceof z.ZodError) {
        handleZodError(res, err)
        return
    }

    const { code, message } = HTTP_RESPONSE.SERVER_ERROR.INTERNAL_SERVER_ERROR

    res.status(code).send(err.message || message)
    return
}
