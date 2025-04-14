import { Router } from "express"
import asyncHandler from "express-async-handler"
import AuthController from "../controllers/auth.controller"
import { celebrate, Segments } from "celebrate"
import { authLoginSchema, authRecoverySchema } from "../models/user.model"

const authRouter = Router()

authRouter.post("/auth/login", celebrate({[Segments.BODY]: authLoginSchema}), asyncHandler(AuthController.login))
authRouter.post("/auth/recovery", celebrate({[Segments.BODY]: authRecoverySchema}), asyncHandler(AuthController.recovery))

export default authRouter