const mongoose = require("mongoose")


const employeeSchema = new mongoose.Schema({
    name: String,
    startWorkYear: Number,
    department: String,
})

module.exports = mongoose.model("employees", employeeSchema)