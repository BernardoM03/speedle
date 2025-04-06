const connect = require("./connect")
const express = require("express");
const cors = require("cors");
const sites = require("./siteRoutes")
const leaderboard = require("./leaderboardRoutes")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use(sites)
app.use(leaderboard)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Backend server is running on port ${PORT}`)
})