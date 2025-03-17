import { Router } from "express"
import { UserController } from "../controllers/user.controller"
import asyncHandler from "express-async-handler"

const userRoutes = Router()

userRoutes.get("/users", asyncHandler(UserController.getAll))
userRoutes.get("/users/:id", asyncHandler(UserController.getById))
userRoutes.post("/users", asyncHandler(UserController.save))
userRoutes.put("/users/:id", asyncHandler(UserController.update))
userRoutes.delete("/users/:id", asyncHandler(UserController.delete))

export default userRoutes