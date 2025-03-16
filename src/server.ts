import { log } from "node:console"
import { initializeApp } from 'firebase-admin/app';
import app from "./app"

initializeApp()

const PORT = process.env.PORT || 3000

app.listen(+PORT, () => log("Server running!"))