import assert from 'node:assert'

import { AppError } from './AppError'
import { THttpStatusCode } from '../constants/http'
import { EAappErrorCode } from '../constants/appErrorCode'


type TAppAssert = (
    condition: any,
    httpStatusCode: THttpStatusCode,
    message: string,
    appErrorCode?: EAappErrorCode
) => asserts condition


// how assert works?
// if condition - false, then throw message
export const appAssert: TAppAssert = (
        condition, 
        httpStatusCode,
        message, 
        appErrorCode
    ) => assert(condition, new AppError(httpStatusCode, message, appErrorCode))
