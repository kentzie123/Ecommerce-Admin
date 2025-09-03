const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema({
  value: { type: String, required: true }, // e.g. "500g", "1kg", "2kg"
});
module.exports = mongoose.model("Weight", WeightSchema);
