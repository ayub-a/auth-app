import { EAappErrorCode } from "../constants/appErrorCode"
import { THttpStatusCode } from "../constants/http"


export class AppError extends Error {

    constructor(
        public statusCode: THttpStatusCode,
        public message: string,
        public errorCode?: EAappErrorCode
    ) {
        super(message)
    }

}
