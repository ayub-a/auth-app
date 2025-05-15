import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken"

import { IUserModel } from "../models/user.model"
import { ISessionModel } from "../models/session.model"
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env"


interface IAccessTokenPayload {
    userId: IUserModel['_id']
    sessionId:  ISessionModel['_id']
}

interface IRefreshTokenPayload {
    sessionId:  ISessionModel['_id']
}

interface ISignOptionsAndSecret extends SignOptions {
    secret: string
}

interface IVerifyOptions extends VerifyOptions {
    secret: string
}


class SignToken {

    private readonly defaults: SignOptions = {
        audience: ['user']
    }

    private readonly accessTokenSignOptions: ISignOptionsAndSecret = {
        expiresIn: '15min',
        secret: JWT_SECRET
    }

    private readonly refreshTokenSignOptions: ISignOptionsAndSecret = {
        expiresIn: '30d',
        secret: JWT_REFRESH_SECRET
    }


    createAccessToken(payload: IAccessTokenPayload, options?: ISignOptionsAndSecret) {
        const { secret, ...signOptions } = options || this.accessTokenSignOptions
        return jwt.sign(payload, secret, { ...this.defaults, ...signOptions })
    }


    createRefreshToken(payload: IRefreshTokenPayload, options?: ISignOptionsAndSecret) {
        const { secret, ...signOptions } = options || this.refreshTokenSignOptions
        return jwt.sign(payload, secret, { ...this.defaults, ...signOptions })
    }


    verify<TPayload extends object = IAccessTokenPayload>(token: string, options?: IVerifyOptions) {
        try {
            const { secret = JWT_SECRET, ...verifyOptions } = options || {}
            const payload  = jwt.verify( token, secret, { ...this.defaults, ...verifyOptions }) as TPayload
            
            return {
                payload
            }
        } catch (error: any) {
            return {
                error: error.message
            }
        }
    }

}


export const signToken = new SignToken()
