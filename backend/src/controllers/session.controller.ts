import { NextFunction, Request, Response } from "express";

import { SessionModel } from "../models/session.model";
import { HTTP_STATUS } from "../constants/http";


class SessionConroller {

    async getSessions(req: Request, res: Response, next: NextFunction) {
        try {
            const sessions = await SessionModel.find(
                { 
                    userId: req.userId,
                    expiresAt: { $gt: new Date() }
                },
                {
                    _id: 1,
                    userAgent: 1,
                    createdAt: 1
                },
                {
                    sort: { createdAt: -1 }
                }
            )


            res
                .status(HTTP_STATUS.OK)
                .json(
                    sessions.map(session => ({
                        ...session.toObject(),
                        ...(session.id === req.sessionId && { isCurrent: true })
                    }))
                )
        } catch (error) {
            next()
        }
    }

}


export const sessionController = new SessionConroller()
