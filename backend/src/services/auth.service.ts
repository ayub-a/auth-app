import jwt from "jsonwebtoken"

import { UserModel } from "../models/user.model"
import { SessionModel } from "../models/session.model"

import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env"


interface ICreateAccountParams {
    email: string
    password: string
    userAgent?: string
}


class AuthService {

    async createAccount(data: ICreateAccountParams) {

        const isUserExist = await UserModel.exists({ email: data.email })
        if (isUserExist) throw new Error('User already exist.')

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

        return { user, refreshToken, accessToken }
    }

}


export const authService = new AuthService()
