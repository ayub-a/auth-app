import { APP_ORIGIN } from "../../constants/env";
import { HTTP_STATUS } from "../../constants/http";

import { UserModel } from "../../models/user.model";
import { VerificationCodeModel } from "../../models/verificationCode.model";
import { EVerificationCodeType } from "../../types/verificationCodeType";

import { appAssert } from "../../utils/appAssert";
import { TimeUtils } from "../../utils/date";
import { EmailUtils, emailUtils } from "../../utils/sendEmail";


// actially send a password reset email
export async function passwordForgot(email: string) {
    
    const user = await UserModel.findOne({ email })
    appAssert(user, HTTP_STATUS.NOT_FOUND, 'Email not found!')
    

    const count = await VerificationCodeModel.countDocuments({
        userId: user._id,
        type: EVerificationCodeType.PasswordReset,
        createdAt: { $gt: TimeUtils.fiveMinutesAgo }
    })

    appAssert(count <= 1, HTTP_STATUS.TOO_MANY_REQUESTS, 'Too many requests, please try again later.')


    const expiresAt = TimeUtils.oneHourFromNow
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: EVerificationCodeType.PasswordReset,
        expiresAt
    })


    const url = `${APP_ORIGIN}/password/reset?code=${verificationCode._id}&exp=${expiresAt.getTime()}`

    const { data, error } = await emailUtils.sendEmail({ to: user.email, ...EmailUtils.getPasswordResetTemplate(url) })
    appAssert(data?.id, HTTP_STATUS.INTERNAL_SERVER_ERROR, `${error?.name} - ${error?.message}`)

    return {
        url,
        emailId: data.id
    }
}