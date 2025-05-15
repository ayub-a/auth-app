import { HTTP_STATUS } from "../../constants/http"
import { SessionModel } from "../../models/session.model"
import { appAssert } from "../../utils/appAssert"
import { TimeUtils } from "../../utils/date"
import { IRefreshTokenPayload, tokenService, TokenService } from "../token.service"


export async function refreshUserAccessToken(token: string) {
    const { payload } = tokenService.verify<IRefreshTokenPayload>(token, { 
        secret: TokenService.refreshTokenSignOptions.secret 
    })
    appAssert(payload, HTTP_STATUS.UNAUTHORIZED, 'Missing refresh token')

    const session = await SessionModel.findById(payload.sessionId)
    const now = Date.now()
    appAssert(session && session.expiresAt.getTime() > now, HTTP_STATUS.UNAUTHORIZED, 'Session expired')

    const sessionNeedsRefresh = session.expiresAt.getTime() - now <= TimeUtils.ONE_DAY_MS
    if (sessionNeedsRefresh) {
        session.expiresAt = TimeUtils.thirtyDaysFromNow
        await session.save()
    }

    const newRefreshToken = sessionNeedsRefresh 
        ? tokenService.createRefreshToken({ sessionId: session._id })
        : undefined

    const accessToken = tokenService.createAccessToken({
        userId: session.userId,
        sessionId: session._id
    })

    return { 
        accessToken, 
        newRefreshToken
    }
}
