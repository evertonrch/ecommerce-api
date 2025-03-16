import express from "express"

const app = express()

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.status(200).send("SOMETHING")
})

app.all("*", (req, res) => {
    return res.status(400).send("sdfds")
})

app.listen(PORT, () => console.log("Server up!!"))