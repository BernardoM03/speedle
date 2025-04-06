const express = require("express");
const database = require("./connect");

let siteRoutes = express.Router()

// Retrieve all site data
// http://localhost:5000/sites
siteRoutes.route("/sites").get(async (req, res) => {
    let db = database.getDb()
    let data = await db.collection("siteData").find({}).toArray()
    if (data.length > 0) {
        res.json(data)
    } else {
        throw new Error("Could not find data");
    }
})

module.exports = siteRoutes;