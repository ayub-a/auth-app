import { Router } from "express";
import { sessionController } from "../controllers/session.controller";

const sessionRouter = Router()


sessionRouter
    .get('/', sessionController.getSessions)
    .delete('/:id', sessionController.deleteSesion)


export default sessionRouter
