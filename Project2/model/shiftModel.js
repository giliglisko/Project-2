const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
   date: String,
   startingHour: String,
   endingHour: String,
   employees: [String] 
});


module.exports = mongoose.model("Shift", shiftSchema);
