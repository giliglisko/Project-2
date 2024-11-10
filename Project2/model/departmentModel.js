const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: String,
    manager: String,
});

module.exports = mongoose.model("departments", departmentSchema);
