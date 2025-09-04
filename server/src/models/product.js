import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },

    // Category references (3 levels)
    mainCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true, // must have at least one category
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // optional
    },
    subSubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // optional
    },

    description: { type: String, trim: true },

    // Pricing
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },

    // Stock & Inventory
    stock: { type: Number, default: 0 },
    trackInventory: { type: Boolean, default: true },

    // Images
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
      },
    ],
    thumbnail: {
      url: { type: String },
      publicId: { type: String },
    },

    // SEO fields
    metaTitle: { type: String, trim: true, maxlength: 60 },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    canonicalUrl: { type: String, trim: true },

    status: { type: Boolean, default: true }, // active/inactive
  },
  { collection: "products", timestamps: true }
);

// Indexes
ProductSchema.index({ slug: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ mainCategory: 1, subCategory: 1, subSubCategory: 1 });

const Product = mongoose.model("Product", ProductSchema);
export default Product;