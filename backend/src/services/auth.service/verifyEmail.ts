import { HTTP_STATUS } from "../../constants/http";
import { EVerificationCodeType } from "../../types/verificationCodeType";

import { UserModel } from "../../models/user.model";
import { VerificationCodeModel } from "../../models/verificationCode.model";

import { appAssert } from "../../utils/appAssert";


export async function verifyEmail(code: string) {

    const validCode = await VerificationCodeModel.findOne({
        _id: code,
        type: EVerificationCodeType.EmailVerification,
        expiresAt: { $gt: new Date() }
    })
    appAssert(validCode, HTTP_STATUS.NOT_FOUND, 'Invalid or expired verification code')

    const updatedUser = await UserModel.findByIdAndUpdate(
        validCode.userId, 
        { verified: true }, 
        { new: true }
    )
    appAssert(updatedUser, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Failed to verify email')
    updatedUser.save()

    await validCode.deleteOne()

    return {
        user: updatedUser.omitPassword()
    }
}
