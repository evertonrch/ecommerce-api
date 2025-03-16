import { log } from "node:console"
import app from "./app"

const PORT = process.env.PORT || 3000

app.listen(+PORT, () => log("Server running!"))