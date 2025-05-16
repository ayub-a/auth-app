import { HTTP_STATUS } from "../../constants/http"
import { EVerificationCodeType } from "../../types/verificationCodeType"

import { SessionModel } from "../../models/session.model"
import { UserModel } from "../../models/user.model"
import { VerificationCodeModel } from "../../models/verificationCode.model"

import { appAssert } from "../../utils/appAssert"
import { hashValue } from "../../utils/bcrypt"


interface IParams {
    password: string
    verificationCode: string
}


export async function passwordReset({ password, verificationCode }: IParams) {

    const validCode = await VerificationCodeModel.findOne({ 
        _id: verificationCode,
        type: EVerificationCodeType.PasswordReset,
        expiresAt: { $gt: new Date() }
    })
    appAssert(validCode, HTTP_STATUS.NOT_FOUND, 'Invalid or expired verification code.')


    const updatedUser = await UserModel.findByIdAndUpdate(
        validCode.userId,
        {
            password: await hashValue(password),
        }
    )
    appAssert(updatedUser, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Failed to reset password.')


    await validCode.deleteOne()

    await SessionModel.deleteMany({ 
        userId: updatedUser._id
    })


    return {
        user: updatedUser.omitPassword()
    }
}

