import mongoose from "mongoose";

import { thirtyDaysFromNow } from "../utils/date";


export interface ISessionModel extends mongoose.Document {
    userId: mongoose.Types.ObjectId
    userAgent?: string
    createdAt: Date
    expiresAt: Date
}


const sessionModel = new mongoose.Schema<ISessionModel>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    userAgent: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, default: thirtyDaysFromNow }
})


export const SessionModel = mongoose.model('Session', sessionModel)
