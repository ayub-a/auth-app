import { HTTP_STATUS } from "../../constants/http"

import { SessionModel } from "../../models/session.model"
import { UserModel } from "../../models/user.model"

import { appAssert } from "../../utils/appAssert"
import { parseUserAgent } from "../../utils/userAgent"

import { tokenService } from "../token.service"

import { IAuthParams } from "."


export async function login(data: IAuthParams) {

    const user = await UserModel.findOne({ email: data.email })
    appAssert(user, HTTP_STATUS.UNAUTHORIZED, 'Wrong email')

    const isPasswordValid = await user.comparePassword(data.password)
    appAssert(isPasswordValid, HTTP_STATUS.UNAUTHORIZED, 'Wrong password')

    const session = await SessionModel.create({
        userId: user._id,
        userAgent: parseUserAgent(data.userAgent)        
    })

    const accessToken = tokenService.createAccessToken({ userId: user._id, sessionId: session._id })
    const refreshToken = tokenService.createRefreshToken({ sessionId: session._id  })

    return {
        user: user.omitPassword(),
        refreshToken,
        accessToken
    }
}
