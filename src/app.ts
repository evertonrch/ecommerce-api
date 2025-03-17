import express from "express"
import userRoutes from "./routes/user.route"
import errorHandler from "./middlewares/error-handler.middleware"
import { pageNotFoundHanlder } from "./middlewares/page-not-found.middleware"
import { errors } from "celebrate"

const app = express()

app.use(express.json())
app.use(userRoutes) 
app.use(pageNotFoundHanlder)
app.use(errors())
app.use(errorHandler)

export default app