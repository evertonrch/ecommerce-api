import "dotenv/config"
import { log } from "node:console"

import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app"

initializeAdminApp()
initializeFirebaseApp({
    apiKey: process.env.API_KEY
})

import app from "./app"

app.listen(process.env.PORT || 3000, () => log("Server running!"))