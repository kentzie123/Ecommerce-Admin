// Models
import Category from "../models/category.js";

// cloudinary uploader
import { uploadImage } from "../utils/uploadImage.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const getParentCategories = async (req, res) => {
  try {
    const parents = await Category.find({
      parent_category: null,
      sub_parent: null,
      status: true,
    });
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getSubCategories = async (req, res) => {
  const parentId = req.params.parentId;
  try {
    const subs = await Category.find({
      parent_category: parentId,
      sub_parent: null,
      status: true,
    });
    res.status(200).json(subs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createCategory = async (req, res) => {
  const {
    name,
    slug,
    parent_category,
    sub_parent,
    description,
    metaTitle,
    metaDescription,
    canonicalUrl,
    thumbnail,
    status,
  } = req.body;
  console.log(parent_category.value);
  

  let thumbnailURL = null;

  try {
    if (!name || !slug) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    if (thumbnail) {
      const uploadResult = await uploadImage(thumbnail, "message-pictures");

      if (!uploadResult.success) {
        return res.status(400).json({ message: uploadResult.error });
      }

      thumbnailURL = uploadResult.url;
    }

    const newCategory = new Category({
      name,
      slug,
      parent_category: parent_category?.value,
      sub_parent: sub_parent?.value,
      description,
      metaTitle,
      metaDescription,
      canonicalUrl,
      thumbnail: thumbnailURL,
      status,
    });
    await newCategory.save();

    res.status(201).json("Created category successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
