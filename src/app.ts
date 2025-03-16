import express from "express"
import userRoutes from "./routes/user.route"

const app = express()
app.use(express.json())

app.use(userRoutes)

app.all("*", (req, res, next) => {
    res.status(404).send({
        message: "rota não encontrada."
    })        
})

export default app