import { Router } from "express"
import { UserController } from "../controllers/user.controller"

const userRoutes = Router()

userRoutes.get("/users", UserController.getAll)
userRoutes.get("/users/:id",UserController.userNotExists, UserController.getById)
userRoutes.post("/users", UserController.bodyValidator, UserController.save)
userRoutes.put("/users/:id", UserController.userNotExists, UserController.update)
userRoutes.delete("/users/:id",UserController.userNotExists, UserController.delete)

export default userRoutes