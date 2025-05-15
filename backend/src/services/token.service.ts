import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken"

import { IUserModel } from "../models/user.model"
import { ISessionModel } from "../models/session.model"
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env"


export interface IAccessTokenPayload {
    userId: IUserModel['_id']
    sessionId:  ISessionModel['_id']
}

export interface IRefreshTokenPayload {
    sessionId:  ISessionModel['_id']
}

interface ISignOptionsAndSecret extends SignOptions {
    secret: string
}

interface ITokenVerifyOptions extends VerifyOptions {
    secret: string
}


export class TokenService {

    private static defaults: SignOptions = {
        audience: ['user']
    }

    static readonly accessTokenSignOptions: ISignOptionsAndSecret = {
        expiresIn: '15min',
        secret: JWT_SECRET
    }

    static readonly refreshTokenSignOptions: ISignOptionsAndSecret = {
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


    verify<TPayload extends object = IAccessTokenPayload>(token: string, options?: ITokenVerifyOptions) {
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
