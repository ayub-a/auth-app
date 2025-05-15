import { EAappErrorCode } from "../../constants/appErrorCode"
import { HTTP_STATUS } from "../../constants/http"
import { SessionModel } from "../../models/session.model"
import { appAssert } from "../../utils/appAssert"
import { tokenService } from "../token.service"


export async function logout(token: string) {
    const { payload } = tokenService.verify(token)
    appAssert(payload, HTTP_STATUS.UNAUTHORIZED, EAappErrorCode.InvalidAccessToken)

    await SessionModel.findByIdAndDelete(payload.sessionId)
}
