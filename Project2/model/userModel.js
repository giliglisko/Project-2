const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    numberOfActions: Number,
    numberOfActionsLeft: Number
})

module.exports = mongoose.model("users", userSchema)