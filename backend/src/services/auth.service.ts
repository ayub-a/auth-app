
import { UserModel } from "../models/user.model"
import { SessionModel } from "../models/session.model"

import { appAssert } from "../utils/appAssert"
import { tokenService } from "./token.service"

import { HTTP_STATUS } from "../constants/http"
import { EAappErrorCode } from "../constants/appErrorCode"


interface IAuthParams {
    email: string
    password: string
    userAgent?: string
}


class AuthService {

    async createAccount(data: IAuthParams) {

        const isUserExist = await UserModel.exists({ email: data.email })

        appAssert(!isUserExist, HTTP_STATUS.CONFLICT, 'Email already in use')

        const user = await UserModel.create({
            email: data.email,
            password: data.password
        })


        // send verification email


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


    async login(data: IAuthParams) {

        const user = await UserModel.findOne({ email: data.email })
        appAssert(user, HTTP_STATUS.UNAUTHORIZED, 'Wrong email')

        const isPasswordValid = await user.comparePassword(data.password)
        appAssert(isPasswordValid, HTTP_STATUS.UNAUTHORIZED, 'Wrong password')

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


    async logout(token: string) {
        const { payload } = tokenService.verify(token)
        appAssert(payload, HTTP_STATUS.UNAUTHORIZED, EAappErrorCode.InvalidAccessToken)

        await SessionModel.findByIdAndDelete(payload.sessionId)
    }

}


export const authService = new AuthService()
