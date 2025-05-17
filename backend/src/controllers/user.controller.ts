import { NextFunction, Request, Response } from "express";

import { UserModel } from "../models/user.model";
import { appAssert } from "../utils/appAssert";
import { HTTP_STATUS } from "../constants/http";


class UserController {

    // no need service for that
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserModel.findById(req.userId)
            appAssert(user, HTTP_STATUS.NOT_FOUND, 'User not found.')

            res
                .status(HTTP_STATUS.OK)
                .json(user.omitPassword())
        } catch (error) {
            next(error)
        }
    }

}


export const userController = new UserController()
