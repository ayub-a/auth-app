import mongoose from "mongoose";
import { IResult } from "ua-parser-js";

import { TimeUtils } from '../utils/date';


export interface ISessionModel extends mongoose.Document<mongoose.Types.ObjectId> {
    userId: mongoose.Types.ObjectId
    userAgent: IResult
    createdAt: Date
    expiresAt: Date
}


const sessionModel = new mongoose.Schema<ISessionModel>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    userAgent: {
        browser: {
            name: String,
            version: String,
        },
        os: {
            name: String,
            version: String,
        },
        device: {
            model: String,
            type: String,
            vendor: String,
        },
    },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, default: TimeUtils.thirtyDaysFromNow }
})


export const SessionModel = mongoose.model('Session', sessionModel)
