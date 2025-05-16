import mongoose from "mongoose";

import { EVerificationCodeType } from "../types/verificationCodeType";


export interface IVerificationCodeModel extends mongoose.Document {
    userId: mongoose.Types.ObjectId
    type: EVerificationCodeType
    createdAt: Date
    expiresAt: Date
}


const verificationCodeModel = new mongoose.Schema<IVerificationCodeModel>({
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true }
})


export const VerificationCodeModel = mongoose.model<IVerificationCodeModel>(
    'VerificationCode', 
    verificationCodeModel,
    'verification_codes'
)
