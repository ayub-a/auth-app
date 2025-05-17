import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { SessionModel } from "../models/session.model";
import { HTTP_STATUS } from "../constants/http";
import { appAssert } from "../utils/appAssert";


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


    async deleteSesion(req: Request, res: Response, next: NextFunction) {
        try {
            const sessionId = z.string().parse(req.params.id)
            const deleted = await SessionModel.findOneAndDelete({
                _id: sessionId,
                userId: req.userId
            })
            appAssert(deleted, HTTP_STATUS.NOT_FOUND, 'Session not found.')


            res
                .status(HTTP_STATUS.OK)
                .json({ message: 'Session deleted!' })
            
        } catch (error) {
            next(error)
        }
    }

}


export const sessionController = new SessionConroller()
