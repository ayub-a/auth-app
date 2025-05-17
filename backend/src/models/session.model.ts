import mongoose from "mongoose";
import { TimeUtils } from '../utils/date';


export interface ISessionModel extends mongoose.Document<mongoose.Types.ObjectId> {
    userId: mongoose.Types.ObjectId
    userAgent?: string
    createdAt: Date
    expiresAt: Date
}


const sessionModel = new mongoose.Schema<ISessionModel>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    userAgent: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, default: TimeUtils.thirtyDaysFromNow }
})


export const SessionModel = mongoose.model('Session', sessionModel)
