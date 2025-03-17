import express from "express"
import userRoutes from "./routes/user.route"
import errorHandler from "./middlewares/error-handler.middleware"
import { pageNotFoundHanlder } from "./middlewares/page-not-found.middleware"

const app = express()

app.use(express.json())
app.use(userRoutes) 
app.use(pageNotFoundHanlder)
app.use(errorHandler)

export default app