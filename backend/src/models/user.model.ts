import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";


export interface IUserModel extends mongoose.Document {
    email: string
    password: string
    verified: boolean
    createdAt: Date
    updatedAt: Date
    comparePassword(val: string): Promise<boolean>
}


const userModel = new mongoose.Schema<IUserModel>(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true, select: false },
        verified: { type: Boolean, required: true, default: false }
    }, {
        timestamps: true
    }
)


userModel.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
        return
    }

    this.password = await hashValue(this.password, 8)
    next()
})


userModel.methods.comparePassword = async function(val: string) {
    return compareValue(val, this.password)
}


export const UserModel = mongoose.model<IUserModel>('User', userModel)
