const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String },

  image: [{ type: String, required: true }],

  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  sub_parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  third_level_category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },

  // Array of variations
  variations: [
    {
      size: { type: String },            // "M", "L", "XL"
      weight: { type: String },          // "200g", "1kg", etc.
      price: { type: Number, required: true },
      old_price: { type: Number, default: null },
      stock: { type: Number, default: 0 },
      discount: { type: Number, default: 0 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
