import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    parent_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    sub_parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    description: { type: String, trim: true, maxlength: 160 },
    metaTitle: { type: String, trim: true, maxlength: 60 },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    canonicalUrl: { type: String, trim: true },
    image: {
      url: { type: String },
      publicId: { type: String },
    },
    thumbnail: {
      url: { type: String },
      publicId: { type: String },
    },
    status: { type: Boolean, default: true },
  },
  { collection: "categories", timestamps: true }
);

// Indexes
CategorySchema.index({ status: 1 }); // quick filter by active/inactive
CategorySchema.index({ parent_category: 1 }); // faster queries for subcategories
CategorySchema.index({ sub_parent: 1 }); // faster queries for nested hierarchy

const Category = mongoose.model("Category", CategorySchema);
export default Category;
