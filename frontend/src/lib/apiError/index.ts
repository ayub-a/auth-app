import type { AxiosError } from "axios"

import { navigate } from "../navigate"
import { registerErrors } from "./registerErrors"


export type TApiErrorData = { errorCode: string }
type TErrorHandler = (error: AxiosError<TApiErrorData>) => Promise<unknown> | void


export class ApiError {

    private static handlers = new Map<string, TErrorHandler>()


    static navigateTo(to?: string) {
        navigate(to || '/login',
            { 
                state: { 
                    redirectUrl: location.pathname 
                } 
            }
        )
    }


    private static createErrorKey(status: number, code?: string): string {
        return `${status}:${code}`
    }


    register (status: number, code: string, handler: TErrorHandler) {
        const key = ApiError.createErrorKey(status, code)
        ApiError.handlers.set(key, handler)
    }


    async handle(error: AxiosError<TApiErrorData>) {
        const status = error.response?.status
        const code = error.response?.data.errorCode

        if (!status || !code) return 

        const key = ApiError.createErrorKey(status, code)
        const handler = ApiError.handlers.get(key)

        if (handler) return await handler(error)
    }

}

export const apiError = new ApiError()

registerErrors()
