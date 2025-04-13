import "dotenv/config"
import { log } from "node:console"
import { initializeApp } from 'firebase-admin/app';
initializeApp()

import app from "./app"

const PORT = process.env.PORT || 3000

app.listen(+PORT, () => log("Server running!"))