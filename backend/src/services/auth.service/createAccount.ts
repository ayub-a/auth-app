import { HTTP_STATUS } from "../../constants/http"
import { APP_ORIGIN } from "../../constants/env"
import { EVerificationCodeType } from "../../types/verificationCodeType"

import { SessionModel } from "../../models/session.model"
import { UserModel } from "../../models/user.model"
import { VerificationCodeModel } from "../../models/verificationCode.model"

import { appAssert } from "../../utils/appAssert"
import { TimeUtils } from "../../utils/date"
import { EmailUtils, emailUtils } from "../../utils/sendEmail"

import { tokenService } from "../token.service"
import { IAuthParams } from "."


export async function createAccount(data: IAuthParams) {

    const isUserExist = await UserModel.exists({ email: data.email })
    appAssert(!isUserExist, HTTP_STATUS.CONFLICT, 'Email already in use')

    const user = await UserModel.create({
        email: data.email,
        password: data.password
    })


    const verificationEmail = await VerificationCodeModel.create({
        userId: user._id,
        type: EVerificationCodeType.EmailVerification,
        expiresAt: TimeUtils.thirtyDaysFromNow
    })

    const url = `${APP_ORIGIN}/email/verify/${verificationEmail._id}`

    const { error } = await emailUtils.sendEmail({ to: user.email, ...EmailUtils.getVerifyEmailTemplate(url) })
    if (error) console.log('SEND_EMAIL_ERROR', error)
    

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
