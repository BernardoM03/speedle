const connect = require("./connect")
const express = require("express");
const cors = require("cors");
const sites = require("./siteRoutes")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use(sites)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Backend server is running on port ${PORT}`)
})