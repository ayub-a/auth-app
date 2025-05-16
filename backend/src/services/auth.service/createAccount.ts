import { HTTP_STATUS } from "../../constants/http"
import { EVerificationCodeType } from "../../types/verificationCodeType"

import { SessionModel } from "../../models/session.model"
import { UserModel } from "../../models/user.model"
import { VerificationCodeModel } from "../../models/verificationCode.model"

import { appAssert } from "../../utils/appAssert"
import { TimeUtils } from "../../utils/date"

import { tokenService } from "../token.service"
import { IAuthParams } from "."


export async function createAccount(data: IAuthParams) {

    const isUserExist = await UserModel.exists({ email: data.email })

    appAssert(!isUserExist, HTTP_STATUS.CONFLICT, 'Email already in use')

    const user = await UserModel.create({
        email: data.email,
        password: data.password
    })

    // send verification email
    const verificationEmail = await VerificationCodeModel.create({
        userId: user._id,
        type: EVerificationCodeType.EmailVerification,
        expiresAt: TimeUtils.thirtyDaysFromNow
    })

    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent
    })

    const accessToken = tokenService.createAccessToken({ userId: user._id, sessionId: session._id })
    const refreshToken = tokenService.createRefreshToken({ sessionId: session._id  })

    return { 
        user: user.omitPassword(), 
        refreshToken, 
        accessToken 
    }
}
