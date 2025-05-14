import { ErrorRequestHandler } from "express";
import { HTTP_RESPONSE } from "../constants/http";


export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`PATH: ${req.path}`, err)

    const { code, message } = HTTP_RESPONSE.SERVER_ERROR.INTERNAL_SERVER_ERROR

    res.status(code).send(message)
    return
}
