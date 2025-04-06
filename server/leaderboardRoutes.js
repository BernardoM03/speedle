const express = require("express");
const database = require("./connect");

let leaderboardRoutes = express.Router()

// Retrieve all site data
// http://localhost:5000/leaderboard
leaderboardRoutes.route("/leaderboard").get(async (req, res) => {
    let db = database.getDb()
    let data = await db.collection("leaderboardData").find({}).toArray()
    if (data.length > 0) {
        res.json(data)
    } else {
        throw new Error("Could not find data");
    }
})

module.exports = leaderboardRoutes;