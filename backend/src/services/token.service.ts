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


class TokenService {

    private static defaults: SignOptions = {
        audience: ['user']
    }

    private static readonly accessTokenSignOptions: ISignOptionsAndSecret = {
        expiresIn: '15min',
        secret: JWT_SECRET
    }

    private static readonly refreshTokenSignOptions: ISignOptionsAndSecret = {
        expiresIn: '30d',
        secret: JWT_REFRESH_SECRET
    }


    createAccessToken(payload: IAccessTokenPayload, options?: ISignOptionsAndSecret) {
        const { secret, ...signOptions } = options || TokenService.accessTokenSignOptions
        return jwt.sign(payload, secret, { ...TokenService.defaults, ...signOptions })
    }


    createRefreshToken(payload: IRefreshTokenPayload, options?: ISignOptionsAndSecret) {
        const { secret, ...signOptions } = options || TokenService.refreshTokenSignOptions
        return jwt.sign(payload, secret, { ...TokenService.defaults, ...signOptions })
    }


    verify<TPayload extends object = IAccessTokenPayload>(token: string, options?: IVerifyOptions) {
        try {
            const { secret = JWT_SECRET, ...verifyOptions } = options || {}
            const payload  = jwt.verify( token, secret, { ...TokenService.defaults, ...verifyOptions }) as TPayload
            
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


export const tokenService = new TokenService()
