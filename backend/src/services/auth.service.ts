import jwt from "jsonwebtoken"

import { UserModel } from "../models/user.model"
import { SessionModel } from "../models/session.model"

import { appAssert } from "../utils/appAssert"

import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env"
import { HTTP_STATUS } from "../constants/http"


interface ICreateAccountParams {
    email: string
    password: string
    userAgent?: string
}


class AuthService {

    async createAccount(data: ICreateAccountParams) {

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

        const refreshToken = jwt.sign(
            {
                sessionId: session._id
            }, 
            JWT_REFRESH_SECRET, 
            {
                expiresIn: '30d',
                audience: ['user']
            }
        )

        const accessToken = jwt.sign(
            {
                userId: user._id,
                sessionId: session._id
            },
            JWT_SECRET,
            {
                expiresIn: '15min',
                audience: ['user']
            }
        )

        return { 
            user: user.omitPassword(), 
            refreshToken, 
            accessToken 
        }
    }

}


export const authService = new AuthService()
