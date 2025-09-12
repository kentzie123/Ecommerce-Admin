import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },

    sku: { type: String, unique: true, sparse: true, trim: true },
    barcode: { type: String, trim: true },

    description: { type: String, trim: true },
    shortDescription: { type: String, trim: true, maxlength: 200 },

    // Pricing (fallback for non-variant products)
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, default: null, min: 0 },
    currency: { type: String, default: "USD" },

    // Stock & inventory
    inStock: { type: Boolean, default: true },
    trackInventory: { type: Boolean, default: true },

    // Category relation (3 levels if you want)
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    subSubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    // Brand
    brand: { type: String, ref: "Brand", trim: true, default: null },

    // Variants (with their own images)
    variants: [
      {
        name: { type: String, trim: true, required: true },
        value: { type: String, trim: true, required: true },
        price: {
          type: Number,
          min: 0,
        },
        stock: {
          type: Number,
          default: 0,
          min: 0,
        },
        sku: {
          type: String,
          trim: true,
          uppercase: true, // Standardize SKU format
        },
        images: [
          {
            url: { type: String, required: true },
            publicId: { type: String },
            alt: { type: String, trim: true, default: "" },
          },
        ],
        // Sizes
        sizes: [
          {
            name: { type: String, required: true },
            values: [{ type: String, required: true }],
          },
        ],
      },
    ],

    // Thumbnail → always shown in product card
    thumbnail: {
      url: { type: String },
      publicId: { type: String },
    },

    // SEO
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 60,
      validate: {
        validator: function (v) {
          return v.length <= 60;
        },
        message: "Meta title should not exceed 60 characters",
      },
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 160,
      validate: {
        validator: function (v) {
          return v.length <= 160;
        },
        message: "Meta description should not exceed 160 characters",
      },
    },
    metaKeywords: {
      type: String,
      trim: true,
      set: function (keywords) {
        // Remove duplicates and limit number of keywords
        const uniqueKeywords = [
          ...new Set(keywords.split(",").map((k) => k.trim())),
        ];
        return uniqueKeywords.slice(0, 10).join(", "); // Limit to 10 keywords
      },
    },
    canonicalUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          // Basic URL validation
          return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
            v
          );
        },
        message: "Please provide a valid URL",
      },
    },

    // Flags
    featured: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
  },
  { collection: "products", timestamps: true }
);

// Indexes
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1, subCategory: 1, subSubCategory: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ status: 1 });

const Product = mongoose.model("Product", ProductSchema);
export default Product;
