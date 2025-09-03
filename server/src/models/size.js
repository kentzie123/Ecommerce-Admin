const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Small", "Medium", "Large"
});
module.exports = mongoose.model("Size", SizeSchema);
