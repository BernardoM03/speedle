const express = require("express");
const database = require("./connect");
const { ObjectId } = require("mongodb");

let userRoutes = express.Router()

// Retrieve all user data
// http://localhost:5000/users
userRoutes.route("/users").get(async (req, res) => {
    let db = database.getDb()
    let data = await db.collection("userData").find({}).toArray()
    if (data.length > 0) {
        res.json(data)
    } else {
        throw new Error("Could not find data")
    }
})

// Retrieve one entity of user data
userRoutes.route("/users/:id").get(async (req, res) => {
    let db = database.getDb()
    let data = await db.collection("userData").findOne({_id: new ObjectId(req.params.id)})
    if (Object.keys(data).length > 0) {
        res.json(data)
    } else {
        throw new Error("Could not find data")
    }
})

// Create one entity of user data
userRoutes.route("/users").post(async (req, res) => {
    let db = database.getDb()
    let mongoObject = {
        name: req.body.name,
        email: req.body.name,
        password: req.body.name,
        joinDate: new Date(),
        records: []
    }
    let data = await db.collection("userData").insertOne(mongoObject)
    res.json(data)
})

// Update one entity of user data
userRoutes.route("/users/:id").put(async (req, res) => {
    let db = database.getDb()
    let mongoObject = {
        $set: {
            name: req.body.name,
            email: req.body.name,
            password: req.body.name,
            joinDate: req.body.joinDate,
            records: req.body.records
        }
    }
    let data = await db.collection("userData").updateOne({id: new ObjectId(req.params.id)}, mongoObject)
    res.json(data)
})

// Delete one entity of user data
userRoutes.route("/users/:id").delete(async (req, res) => {
    let db = database.getDb()
    let data = await db.collection("userData").deleteOne({_id: new ObjectId(req.params.id)})
    res.json(data);
})

module.exports = userRoutes